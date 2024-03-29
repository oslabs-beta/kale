// create metrics slice with type metrics timeseriesMetric[]
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { singleData, MetricsState } from '../../types';

const initialState: MetricsState = {
  userId: '',
  dataAll: null,
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<singleData[]>) => {
      console.log('setMetrics called!');

      if (!state.dataAll) {
        state.dataAll = [
          {
            nodeName: action.payload[0].nodeName,
            cluster: action.payload[0].cluster,
            modelName: action.payload[0].modelName,
            date: action.payload[0].date,
            metrics: [],
          },
        ];
      }
      for (let i = 0; i < state.dataAll.length; i++) {
        console.log(`state.metrics[${i}].metrics: `, state.dataAll[i].metrics);
        const draftMetrics = state.dataAll[i].metrics;
        for (let j = 0; j < action.payload[i].metrics.length; j++) {
          console.log(
            `BEFORE LOOP: action.payload[${i}].metrics.[${j}]: `,
            action.payload[i].metrics[j],
            `draftMetrics[${j}]: `,
            draftMetrics[j]
          );
          if (draftMetrics[j] === undefined) {
            draftMetrics.push({
              name: action.payload[i].metrics[j].name,
              time: [action.payload[i].metrics[j].time],
              value: [action.payload[i].metrics[j].value],
            });
          } else {
            draftMetrics[j].value.push(action.payload[i].metrics[j].value);
            draftMetrics[j].time.push(action.payload[i].metrics[j].time);
          }
          console.log(
            `AFTER LOOP: action.payload[${i}].metrics.[${j}]: `,
            action.payload[i].metrics[j],
            `draftMetrics[${j}]: `,
            draftMetrics[j]
          );
        }
      }
    },
  },
});

export const { setMetrics } = metricsSlice.actions;

export default metricsSlice;
