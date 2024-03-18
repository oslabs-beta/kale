// // Initialize express router
// const express = require('express');
// const fetch = require('node-fetch');
// const router = express.Router();
// const baseUrl = 'http://35.196.85.95/api/v1/query'; // Base URL should be to the query endpoint
// const podName = 'hello-app-67dbb49698-nv68h';

// // Set up routes
// router.get('/cpu-usage', async (req, res) => {
//   const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
//   const encodedQuery = encodeURIComponent(query);
//   const apiUrl = `${baseUrl}?query=${encodedQuery}`; // Correctly use baseUrl here

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     if (data.status !== 'success') {
//       throw new Error('Failed to fetch data from Prometheus');
//     }
//     const formattedData = data.data.result.reduce(
//       (acc, metric) => {
//         (metric.values || []).forEach(([time, value]) => {
//           acc.time.push(time);
//           acc.value.push(value);
//         });
//         return acc;
//       },
//       { time: [], value: [] }
//     );

//     res.status(200).json(formattedData);
//   } catch (error) {
//     console.error('Error fetching CPU usage data:', error);
//     res.status(500).send('Error fetching CPU usage data');
//   }
// });
// module.exports = router;

const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const podName = 'hello-app-67dbb49698-2bs8k';
const baseUrl = 'http://35.196.85.95/api/v1/query';
const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
const encodedQuery = encodeURIComponent(query);
const apiUrl = `${baseUrl}?query=${encodedQuery}`;
// res.locals.cpuUsage = variable;
// add middleware for cpu, network, gpu, etc after all queries then return data to client

router.get('/cpu-usage', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const formattedData = data.data.result.reduce(
      (acc, metric) => {
        metric.values.forEach(([time, value]) => {
          acc.time.push(time);
          acc.value.push(value);
        });
        return acc;
      },
      { time: [], value: [] }
    );

    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching CPU usage data:', error);
    res.status(500).send('Error fetching CPU usage data');
  }
});
// router.get('/cpu-usage', async (req, res) => {
//   const query =
//     //  `  100 * (rate(container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]))`;

//     `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
//   const apiUrl = `${baseUrl}/api/v1/query?query=${encodeURIComponent(query)}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error fetching CPU usage data:', error);
//     res.status(500).send('Error fetching CPU usage data');
//   }
// });
router.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

router.post('/', (req, res) => {
  res.status(201).send('Hello, world!');
});

router.put('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

router.delete('/', (req, res) => {
  res.status(200).send('Hello, world!');
});
// Add a new route for fetching CPU usage data

module.exports = router;
