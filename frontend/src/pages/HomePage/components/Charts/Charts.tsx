import React, {useEffect, useRef} from "react";
import {Chart} from "chart.js";
import './Charts.scss';

const Charts = () => {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    lineChartRef.current && createLineChart(lineChartRef.current);
    pieChartRef.current && createPieChart(pieChartRef.current);
  }, []);

  const createLineChart = (canvasElement: HTMLCanvasElement) => {
    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };
    const config = {
      type: 'line',
      data,
      options: {
        maintainAspectRatio: false,
      }
    };
    new Chart(canvasElement, config);
  }

  const createPieChart = (canvasElement: HTMLCanvasElement) => {
    const data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
    const config = {
      type: 'pie',
      data: data,
      options: {
        maintainAspectRatio: false,
      }
    };
    new Chart(canvasElement, config);
  }

  return (
    <div className="charts row mb-4">
      <div className="col-12 mb-4 col-md-6 mb-md-0">
        <canvas ref={lineChartRef}/>
      </div>
      <div className="col-12 col-md-6">
        <canvas ref={pieChartRef}/>
      </div>
    </div>
  );
};

export default Charts;