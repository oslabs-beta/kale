import { Request, Response, NextFunction } from 'express';
import { ApiData, FetchResponseData, MetricsData } from '../../types';

export const apiController = {
  gpuUsage: async (req: Request, res: Response, next: NextFunction) => {
    const podName = 'hello-app-67dbb49698-ltmv6';
    // const baseUrl = 'http://35.196.85.95/api/v1/query';

    const baseUrl = req.body.baseUrl;
    console.log(`inside gpuUsage middleware`);
    console.log(`baseUrl =: `, baseUrl);
    if (!baseUrl) {
      return next({ status: 400, message: { err: 'Base URL not provided' } });
    }
    const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `${baseUrl}?query=${encodedQuery}`;
    console.log(`apiUrl: `, apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data: FetchResponseData = await response.json();

      const metricsValues: MetricsData = {
        metric: 'GPU Usage',
        time: [],
        value: [],
      };

      data.data.result.forEach((metric) => {
        metric.values.forEach(([time, value]) => {
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
      const errorDetails = {
        log: 'Error fetching GPU usage data',
        status: 500,
        message: { err: 'Error fetching GPU usage data' },
      };
      next(errorDetails);
    }
  },
};
