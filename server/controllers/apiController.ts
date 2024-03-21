import { Request, Response, NextFunction } from 'express';
import {
  ApiData,
  FetchResponseData,
  FetchResponseDatas,
  MetricsData,
} from '../../types';

export const apiController = {
  gpuUsage: async (req: Request, res: Response, next: NextFunction) => {
    const podName = 'hello-app-67dbb49698-zjl8l';

    let baseUrl = req.body.url.includes(`http://`)
      ? req.body.url.slice(7)
      : req.body.url;

    if (!baseUrl) {
      const errObj = {
        status: 400,
        message: { err: 'baseUrl not being provided' },
      };
      return next(errObj);
    }

    const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `http://${baseUrl}/api/v1/query?query=${encodedQuery}`;
    try {
      const response = await fetch(apiUrl);
      const data: FetchResponseDatas = await response.json();

      const metricsValues: MetricsData = {
        metric: 'GPU Usage',
        time: [],
        value: [],
      };

      data.data.result[0].values?.forEach(([time, value]) => {
        let date = new Date(time * 1000);
        let formattedTime = date.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        metricsValues.time.push(formattedTime);
        metricsValues.value.push(Number(value));
      });

      const formattedData: ApiData = {
        podName: podName,
        date: new Date().toLocaleDateString('en-CA', {
          timeZone: 'America/New_York',
        }),
        metrics: {
          gpuUsage: metricsValues,
        },
      };

      res.locals.gpuUsage = formattedData;

      return next();
    } catch (error) {
      const errObj = {
        log: 'Error fetching GPU usage data',
        status: 500,
        message: { err: 'Error fetching GPU usage data' },
      };
      next(errObj);
    }
  },
  nodeGpuUsage: async (req: Request, res: Response, next: NextFunction) => {
    const nodeName = 'Node Name';
    let baseUrl = req.body.url.includes(`http://`)
      ? req.body.url.slice(7)
      : req.body.url;

    if (!baseUrl) {
      const errObj = {
        status: 400,
        message: { err: 'baseUrl not being provided' },
      };
      return next(errObj);
    }

    const query = `100 * avg(1 - rate(node_cpu_seconds_total{mode="idle"}[5m]))`;
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `http://${baseUrl}/api/v1/query?query=${encodedQuery}`;
    console.log(`apiUrl: `, apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data: FetchResponseData = await response.json();

      const metricsValues: MetricsData = {
        metric: 'Node GPU Usage',
        time: [],
        value: [],
      };

      const currentTime = data.data.result[0].value[0];
      const avgValue = data.data.result[0].value[1];

      let date = new Date(currentTime * 1000);
      let formattedTime = date.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      metricsValues.time.push(formattedTime);
      metricsValues.value.push(Number(avgValue));

      const formattedData: ApiData = {
        podName: nodeName,
        date: new Date().toLocaleDateString('en-CA', {
          timeZone: 'America/New_York',
        }),
        metrics: {
          nodeGpuUsage: metricsValues,
        },
      };

      res.locals.nodeGpuUsage = formattedData;

      return next();
    } catch (error) {
      const errObj = {
        log: 'Error fetching Node GPU usage data',
        status: 500,
        message: { err: 'Error fetching NodeGPU usage data' },
      };
      next(errObj);
    }
  },
};
