import React from 'react';
import { Chart } from 'react-google-charts';

const MyChart = () => {
  const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7],
  ];

  const options = {
    pieHole: 0.4,
    legend: { position: 'bottom' }, // Legend adjustment for responsiveness
  };

  return (
    <div style={styles.container}>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', 
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  }
};

export default MyChart;


// import React from 'react';
// import { Chart } from 'react-google-charts';

// const MyChart = () => {
//   const data = [
//     ['Task', 'Hours per Day'],
//     ['Work', 11],
//     ['Eat', 2],
//     ['Commute', 2],
//     ['Watch TV', 2],
//     ['Sleep', 7],
//   ];

//   const options = {
//     pieHole: 0.4,
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '220px', width: "350px" }}>
//       <Chart
//         chartType="PieChart"
//         data={data}
//         options={options}
//         width={"300px"}
//         height={"220px"}
//       />
//     </div>
//   );
// };

// export default MyChart;


