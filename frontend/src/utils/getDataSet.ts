export interface TimeDataSet {
  date: Date;
  value: number;
}

const typeConfigs = {
  day: {
    getCurrentDate: (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()),
    filterCondition: (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate(),
    labelFormat: 'dd-mm-yyyy',
    dateIncrement: (d) => d.setDate(d.getDate() + 1),
  },
  month: {
    getCurrentDate: (d) => new Date(d.getFullYear(), d.getMonth(), 1),
    filterCondition: (d1, d2) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth(),
    labelFormat: 'mm-yyyy',
    dateIncrement: (d) => d.setMonth(d.getMonth() + 1),
  },
  year: {
    getCurrentDate: (d) => new Date(d.getFullYear(), 0, 1),
    filterCondition: (d1, d2) => d1.getFullYear() === d2.getFullYear(),
    labelFormat: 'yyyy',
    dateIncrement: (d) => d.setFullYear(d.getFullYear() + 1),
  }
}

export const formatDate = (date, format) => {
  const map = {
    mm: ("0" + (date.getMonth() + 1)).slice(-2),
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear()
  }

  return format.replace(/mm|dd|yyyy|yy/gi, matched => map[matched])
}


export const getDataSet = (data: TimeDataSet[], type: 'year' | 'month' | 'week' | 'day') => {
  const dataset = [];
  const labels = [];
  const targetData = data.sort((a, b) => a.date.getTime() - b.date.getTime());
  const config = typeConfigs[type];
  let currentDate = config.getCurrentDate(targetData[0].date);
  const lastDate = new Date(targetData[targetData.length - 1].date)

  while (currentDate.getTime() <= lastDate.getTime()) {
    const filteredData = targetData.filter(d => config.filterCondition(d.date, currentDate));
    const sum = filteredData.reduce((acc, d) => acc + d.value, 0);
    dataset.push(sum);
    labels.push(formatDate(currentDate, config.labelFormat));
    config.dateIncrement(currentDate);
  }

  return [dataset, labels];
}