// Initialize express router
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();
const clusterIp = "http://35.233.161.107:80";
const podName = "hello-app-598cc8c6cc-kkdf8";
res.locals.cpuUsage = variable;
// Set up routes
// router.get("/cpu-usage", async (req, res) => {
//   const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
//   const apiUrl = `${clusterIp}/api/v1/query?query=${encodeURIComponent(query)}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();
//     const formattedData = data.data.result.reduce(
//       (acc, metric) => {
//         metric.values.forEach(([time, value]) => {
//           acc.time.push(time);
//           acc.value.push(value);
//         });
//         return acc;
//       },
//       { time: [], value: [] }
//     );

//     res.status(200).json(formattedData);
//   } catch (error) {
//     console.error("Error fetching CPU usage data:", error);
//     res.status(500).send("Error fetching CPU usage data");
//   }
// });
router.get("/cpu-usage", async (req, res) => {
  const query =
    //  `  100 * (rate(container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]))`;

    `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
  const apiUrl = `${clusterIp}/api/v1/query?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching CPU usage data:", error);
    res.status(500).send("Error fetching CPU usage data");
  }
});
router.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

router.post("/", (req, res) => {
  res.status(201).send("Hello, world!");
});

router.put("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

router.delete("/", (req, res) => {
  res.status(200).send("Hello, world!");
});
// Add a new route for fetching CPU usage data

module.exports = router;
