// import React, { FC } from 'react';
// import { MetricsData } from '../../types';
// import { GaugeChartProps } from '../components/GaugeChart';

// export const renderGuageChart = (
//   metricsObj: MetricsData,
//   chartComponenet: FC<GaugeChartProps>
// ): JSX.Element[] => {
//   const lineChartArr: JSX.Element[] = [];

//   for (let i = 0; i < Object.keys(metricsObj).length; i++) {
//     lineChartArr.push(
//       <chartComponenet
//         metric={Object.keys(metricsObj)[i]}
//         value={metricsObj[Object.keys(metricsObj)[i]].value}
//         time={metricsObj[Object.keys(metricsObj)[i]].time}
//         key={i}
//       />
//     );
//   }

//   return lineChartArr;
// };
