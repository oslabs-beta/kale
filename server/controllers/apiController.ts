import { Request, Response, NextFunction } from 'express';
import {
  DataByType,
  FetchResponseData,
  FetchResponseDatas,
  MetricsData,
} from '../../types';
import formatTime from '../util/formatTime';

export const apiController = {
  // gpuUsage: async (req: Request, res: Response, next: NextFunction) => {
  //   const podName = 'hello-app-67dbb49698-zjl8l';

  //   let baseUrl = req.body.url.includes(`http://`)
  //     ? req.body.url.slice(7)
  //     : req.body.url;

  //   if (!baseUrl) {
  //     const errObj = {
  //       status: 400,
  //       message: { err: 'baseUrl not being provided' },
  //     };
  //     return next(errObj);
  //   }

  //   const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
  //   const encodedQuery = encodeURIComponent(query);
  //   const apiUrl = `http://${baseUrl}/api/v1/query?query=${encodedQuery}`;
  //   try {
  //     const response = await fetch(apiUrl);
  //     const data: FetchResponseDatas = await response.json();

  //     const metricsValues: MetricsData = {
  //       metric: 'GPU Usage',
  //       time: [],
  //       value: [],
  //     };

  //     data.data.result[0].values.forEach(([time, value]) => {
  //       let date = new Date(time * 1000);
  //       let formattedTime = date.toLocaleTimeString('en-US', {
  //         timeZone: 'America/New_York',
  //         hour12: false,
  //         hour: '2-digit',
  //         minute: '2-digit',
  //         second: '2-digit',
  //       });
  //       metricsValues.time.push(formattedTime);
  //       metricsValues.value.push(Number(value));
  //     });

  //     const formattedData: DataByType = {
  //       podName: podName,
  //       date: new Date().toLocaleDateString('en-CA', {
  //         timeZone: 'America/New_York',
  //       }),
  //       metrics: {
  //         gpuUsage: metricsValues,
  //       },
  //     };

  //     res.locals.gpuUsage = formattedData;

  //     return next();
  //   } catch (error) {
  //     const errObj = {
  //       log: 'Error fetching GPU usage data',
  //       status: 500,
  //       message: { err: 'Error fetching GPU usage data' },
  //     };
  //     next(errObj);
  //   }
  // },
  // nodeGpuUsage: async (req: Request, res: Response, next: NextFunction) => {
  //   const nodeName = 'Node Name';
  //   let baseUrl = req.body.url.includes(`http://`)
  //     ? req.body.url.slice(7)
  //     : req.body.url;

  //   if (!baseUrl) {
  //     const errObj = {
  //       status: 400,
  //       message: { err: 'baseUrl not being provided' },
  //     };
  //     return next(errObj);
  //   }

  //   const query = `100 * avg(1 - rate(node_cpu_seconds_total{mode="idle"}[5m]))`;
  //   const encodedQuery = encodeURIComponent(query);
  //   const apiUrl = `http://${baseUrl}/api/v1/query?query=${encodedQuery}`;
  //   console.log(`apiUrl: `, apiUrl);
  //   try {
  //     const response = await fetch(apiUrl);
  //     const data: FetchResponseData = await response.json();

  //     const metricsValues: MetricsData = {
  //       metric: 'Node GPU Usage',
  //       time: [],
  //       value: [],
  //     };

  //     const currentTime = data.data.result[0].value[0];
  //     const avgValue = data.data.result[0].value[1];

  //     let date = new Date(currentTime * 1000);
  //     let formattedTime = date.toLocaleTimeString('en-US', {
  //       timeZone: 'America/New_York',
  //       hour12: false,
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //     });
  //     metricsValues.time.push(formattedTime);
  //     metricsValues.value.push(Number(avgValue));

  //     // const formattedData: DataByType = {
  //     //   podName: nodeName,
  //     //   date: new Date().toLocaleDateString('en-CA', {
  //     //     timeZone: 'America/New_York',
  //     //   }),
  //     //   metrics: {
  //     //     nodeGpuUsage: metricsValues,
  //     //   },
  //     // };

  //     res.locals.gpuUsage.metrics.nodeGpuUsage = metricsValues;

  //     return next();
  //   } catch (error) {
  //     const errObj = {
  //       log: 'Error fetching Node GPU usage data',
  //       status: 500,
  //       message: { err: 'Error fetching NodeGPU usage data' },
  //     };
  //     next(errObj);
  //   }
  // },
  getGpuMemoryUsageByNode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('in getGpuMemoryUsageByNode');
    if (!req.body.url) {
      const errObj = {
        log: 'Express error handler caught error in getGpuMemoryUsage: no url provided',
        status: 500,
        message: { err: 'Prometheus url not provided' },
      };
      return next(errObj);
    }
    const baseUrl = req.body.url + '/api/v1/query?query=';
    const query = 'DCGM_FI_DEV_FB_USED';
    const encodedQuery = encodeURIComponent(query);
    const queryUrl = baseUrl + encodedQuery;

    res.locals.baseUrl = baseUrl;

    try {
      const response = await fetch(queryUrl);
      const data: FetchResponseData = await response.json();

      if (!res.locals.metrics) {
        const cluster = data.data.result[0].metric.cluster;
        const nodeName = data.data.result[0].metric.Hostname;
        const exportedContainer = data.data.result[0].metric.exported_container;
        const exportedNamespace = data.data.result[0].metric.exported_namespace;
        const exportedPod = data.data.result[0].metric.exported_pod;
        const date = new Date();
        res.locals.metrics = [
          {
            cluster,
            nodeName,
            exportedContainer,
            exportedNamespace,
            exportedPod,
            date,
          },
        ];
      }

      const metricsData: MetricsData = {
        metric: 'GPU Memory Usage (in MiB)',
        time: formatTime(+data.data.result[0].value[0]),
        value: +data.data.result[0].value[1],
      };

      res.locals.metrics[0].metrics = [metricsData];
      console.log(res.locals.metrics);
      next();
    } catch (error) {
      const errObj = {
        log: 'Error fetching Node GPU usage data',
        status: 500,
        message: { err: 'Error fetching initial data' },
      };
      next(errObj);
    }
  },
  getGpuMemoryFreeByNode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log('in getGpuMemoryFreeByNode');

    const query = 'DCGM_FI_DEV_FB_FREE';
    const encodedQuery = encodeURIComponent(query);
    const queryUrl = res.locals.baseUrl + encodedQuery;
    console.log(queryUrl);
    try {
      const response = await fetch(queryUrl);
      const data: FetchResponseData = await response.json();

      const metricsData: MetricsData = {
        metric: 'GPU Memory Free (in MiB)',
        time: formatTime(+data.data.result[0].value[0]),
        value: +data.data.result[0].value[1],
      };

      res.locals.metrics[0].metrics.push(metricsData);
      console.log(res.locals.metrics);
      next();
    } catch (error) {
      const errObj = {
        log: 'Error fetching Node GPU usage data',
        status: 500,
        message: { err: 'Error fetching initial data' },
      };
      next(errObj);
    }
  },
};
