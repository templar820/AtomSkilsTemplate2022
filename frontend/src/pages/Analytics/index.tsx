import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend, ChartData, ChartOptions,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './styles.scss';
import {getDataSet, TimeDataSet} from "../../utils/getDataSet";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const content: TimeDataSet[] = [
  {
    date: new Date('2022-04-25'),
    value: 5,
  },
  {
    date: new Date('2022-04-26'),
    value: 2,
  },
  {
    date: new Date('2022-04-29'),
    value: 4,
  },
  {
    date: new Date('2022-04-29'),
    value: 3,
  },
  {
    date: new Date('2022-05-02'),
    value: 4,
  }
];

const Analytics = () => {
  const [labels, setLabels] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [period, setPeriod] = useState('day');
  useEffect(() => {
    const [d, l] = getDataSet(content, period);
    setLabels(l);
    setDataset(d);
  }, [period]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: 'Dataset',
        data: dataset,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const data2: ChartData<"pie", number[], string> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Dataset',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (<div>
    <FormControl style={{width: '130px'}}>
      <InputLabel id="demo-controlled-open-select-label">Период</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <MenuItem value={'day'}>День</MenuItem>
        <MenuItem value={'month'}>Месяц</MenuItem>
        <MenuItem value={'year'}>Год</MenuItem>
      </Select>
    </FormControl>
    <div className="charts">
      <div className="chart1">
        <Bar options={options} data={data} />
      </div>
      <div className="chart2">
        <Pie data={data2} options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: true,
              text: 'Pie Chart',
            },
          }
        }}/>
      </div>
    </div>
  </div>);
};

export default Analytics;