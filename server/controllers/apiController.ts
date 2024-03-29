import { Request, Response, NextFunction } from 'express';
import { FetchResponseData, MetricsData } from '../../types';
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
  fetchData: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.url) {
      const errObj = {
        log: 'Express error handler caught error in getGpuMemoryUsage: no url provided',
        status: 500,
        message: { err: 'Prometheus url not provided' },
      };
      return next(errObj);
    }
    const baseUrl = req.body.url + '/api/v1/query?query=';
    const queries = [
      'DCGM_FI_DEV_FB_USED',
      'DCGM_FI_DEV_FB_TOTAL',
      'DCGM_FI_DEV_GPU_UTIL',
      'DCGM_FI_DEV_GPU_TEMP',
      'DCGM_FI_DEV_POWER_USAGE',
    ];
    const queryDesc = [
      'Memory used (in MiB)',
      'Total Frame Buffer of the GPU in MB',
      'GPU utilization (in %)',
      'GPU temperature (in C)',
      'Power draw (in W)',
    ];
    const encodedQuery = queries.map((query) => encodeURIComponent(query));
    const queryUrl = encodedQuery.map((encodedQuery) => baseUrl + encodedQuery);
    res.locals.queryData = [];

    for (let i = 0; i < queryUrl.length; i++) {
      try {
        const response = await fetch(queryUrl[i]);
        const data: FetchResponseData = await response.json();
        data.queryDesc = queryDesc[i];
        res.locals.queryData.push(data);
      } catch (error) {
        const errObj = {
          log: 'Error fetching Node GPU usage data',
          status: 500,
          message: { err: 'Error fetching initial data' },
        };
        next(errObj);
      }
    }
    next();
  },
  formatData: (req: Request, res: Response, next: NextFunction) => {
    res.locals.metrics = [];

    for (let i = 0; i < res.locals.queryData.length; i++) {
      console.log(`outer loop i: ${i}`);

      const cluster = res.locals.queryData[i].data.result[0].metric.cluster;
      console.log(`cluster: ${cluster}`);
      const nodeName = res.locals.queryData[i].data.result[0].metric.Hostname;
      console.log(`nodeName: ${nodeName}`);
      const exportedContainer =
        res.locals.queryData[i].data.result[0].metric?.exported_container || '';
      const exportedNamespace =
        res.locals.queryData[i].data.result[0].metric?.exported_namespace || '';
      const exportedPod =
        res.locals.queryData[i].data.result[0].metric?.exported_pod || '';
      const date = new Date();
      console.log(
        `cluster: ${cluster}, nodeName: ${nodeName}, exportedContainer: ${exportedContainer}, exportedNamespace: ${exportedNamespace}, exportedPod: ${exportedPod}, date: ${date}`
      );
      const metricsData: MetricsData = {
        metric: res.locals.queryData[i].queryDesc,
        time: formatTime(+res.locals.queryData[i].data.result[0].value[0]),
        value: +res.locals.queryData[i].data.result[0].value[1],
      };

      console.log(`metricsData: `, metricsData);
      if (res.locals.metrics.length === 0) {
        res.locals.metrics.push({
          cluster,
          nodeName,
          exportedContainer,
          exportedNamespace,
          exportedPod,
          date,
          metrics: [metricsData],
        });
        console.log(
          'if (res.locals.metrics.length === 0) res.locals.metrics: ',
          res.locals.metrics
        );
      } else {
        for (let j = 0; j < res.locals.metrics.length; j++) {
          console.log(`res.locals.metrics[${j}]: `, res.locals.metrics[j]);
          if (
            exportedContainer !== res.locals.metrics[j].exportedContainer &&
            exportedNamespace !== res.locals.metrics[j].exportedNamespace &&
            exportedPod !== res.locals.metrics[j].exportedPod
          ) {
            res.locals.metrics.push({
              cluster,
              nodeName,
              exportedContainer,
              exportedNamespace,
              exportedPod,
              date,
            });
          } else if (
            exportedContainer === res.locals.metrics[j].exportedContainer &&
            exportedNamespace === res.locals.metrics[j].exportedNamespace &&
            exportedPod === res.locals.metrics[j].exportedPod
          ) {
            if (!res.locals.metrics[j].metrics) {
              res.locals.metrics[j].metrics = [];
            }
            res.locals.metrics[j].metrics.push(metricsData);
          }
        }
      }
    }

    next();
  },
};
