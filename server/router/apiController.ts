// import { CpuUsageData, apiController } from "../../types";
// import { CpuUsageData } from '../../types';
import { Request, Response, NextFunction, RequestHandler } from 'express';

// const apiController: { cpuUsage?: RequestHandler } = {};
interface FetchResponseData {
  status: string;
  data: {
    result: Array<{
      values: Array<[number, string | number]>;
    }>;
  };
}

// Define the structure for the accumulator in the reduce function
interface MetricAccumulator {
  podName: string;
  metric: string;
  time: string[];
  value: (string | number)[];
  Date?: string;
}

const podName = 'hello-app-67dbb49698-2bs8k';
const baseUrl = 'http://35.196.85.95/api/v1/query';
const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
const encodedQuery = encodeURIComponent(query);
const apiUrl = `${baseUrl}?query=${encodedQuery}`;
console.log('in apiController');

export const apiController = {
  cpuUsage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fetch(apiUrl);
      const data: FetchResponseData = await response.json();

      const formattedData = data.data.result.reduce(
        (acc: MetricAccumulator, metric) => {
          metric.values.forEach(([time, value]) => {
            let date = new Date(time * 1000);
            let formattedTime = date.toLocaleTimeString('en-US', {
              timeZone: 'America/New_York',
              hour12: false, // Use 24-hour format
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
            acc.time.push(formattedTime);
            acc.value.push(value);
          });
          return acc;
        },
        {
          podName: `${podName}`,
          metric: `CPU_Usage`,
          time: [],
          value: [],
        }
      );
      let formattedDate = new Date().toLocaleDateString('en-CA', {
        timeZone: 'America/New_York',
      });
      formattedData.Date = formattedDate;
      res.locals.cpuUsage = formattedData;

      return next();
    } catch (error) {
      console.error('Error fetching CPU usage data:', error);
      res.status(500).send('Error fetching CPU usage data');
    }
  },
};

// module.exports = { apiController };
// export default apiController;
