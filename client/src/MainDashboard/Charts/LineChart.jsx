


import React from 'react';
import { Chart } from 'react-google-charts';
import './TemperatureChart.css'; // Importing external CSS for responsive design

const TemperatureChart = () => {
  const data = [
    ['Month', 'Temperature (Celsius)'],
    ['January', -1],
    ['February', 0],
    ['March', 1],
    ['April', 3],
    ['May', 7],
    ['June', 10],
    ['July', 13],
    ['August', 13],
    ['September', 10],
    ['October', 6],
    ['November', 2],
    ['December', 0],
  ];

  const options = {
    chart: {
      title: 'Average Temperatures in Iceland Throughout the Year',
    },
    legend: { position: 'bottom' }, // Positioning the legend below for better visibility
    series: {
      0: { axis: 'Temps' },
    },
    axes: {
      y: {
        Temps: { label: 'Temperature (Celsius)' }, // Y-axis label
      },
    },
    hAxis: {
      title: 'Month', // X-axis label
    },
    vAxis: {
      title: 'Temperature (Celsius)', // Y-axis label
    },
  };

  return (
    <div className="chart-container">
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="100%" 
        height="280px" // Fixed height
      />
    </div>
  );
};

export default TemperatureChart;







// import React from 'react';
// import { Chart } from 'react-google-charts';

// const TemperatureChart = () => {
//   const data = [
//     ['Month', 'Temperature (Celsius)'],
//     ['January', -1],
//     ['February', 0],
//     ['March', 1],
//     ['April', 3],
//     ['May', 7],
//     ['June', 10],
//     ['July', 13],
//     ['August', 13],
//     ['September', 10],
//     ['October', 6],
//     ['November', 2],
//     ['December', 0],
//   ];

//   const options = {
//     chart: {
//       title: 'Average Temperatures in Iceland Throughout the Year',
//     },
//     legend: { position: 'bottom' },
//     series: {
//       0: { axis: 'Temps' },
//     },
//     axes: {
//       y: {
//         Temps: { label: 'Temperature (Celsius)' },
//       },
//     },
//     hAxis: {
//       title: 'Month',
//     },
//     vAxis: {
//       title: 'Temperature (Celsius)',
//     },
//   };

//   return (
//     <div className="chart-container">
//       <Chart
//         chartType="LineChart"
//         data={data}
//         options={options}
//         width="100%"
//         height="280px" 
//       />
//     </div>
//   );
// };

// export default TemperatureChart;









// import React from 'react';
// import { Chart } from 'react-google-charts';
// import './TemperatureChart.css';

// const TemperatureChart = () => {
//   const data = [
//     ['Month', 'Temperature (Celsius)'],
//     ['January', -1],
//     ['February', 0],
//     ['March', 1],
//     ['April', 3],
//     ['May', 7],
//     ['June', 10],
//     ['July', 13],
//     ['August', 13],
//     ['September', 10],
//     ['October', 6],
//     ['November', 2],
//     ['December', 0],
//   ];

//   const options = {
//     chart: {
//       title: 'Average Temperatures in Iceland Throughout the Year',
//     },
//     legend: { position: 'bottom' },
//     series: {
//       0: { axis: 'Temps' },
//     },
//     axes: {
//       y: {
//         Temps: { label: 'Temperature (Celsius)' },
//       },
//     },
//     hAxis: {
//       title: 'Month',
//     },
//     vAxis: {
//       title: 'Temperature (Celsius)',
//     },
//   };

//   return (
//     <div className="chart-container">
//       <Chart
//         chartType="LineChart"
//         data={data}
//         options={options}
//         width="100%"
//         height= "400px"
//       />
//     </div>
//   );
// };


// export default TemperatureChart;














