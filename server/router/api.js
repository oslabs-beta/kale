const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
// add middleware for cpu, network, gpu, etc after all queries then return data to client
const podName = 'hello-app-67dbb49698-2bs8k';
const baseUrl = 'http://35.196.85.95/api/v1/query';
const query = `container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]`;
const encodedQuery = encodeURIComponent(query);

//     //  ` 100 * (rate(container_cpu_usage_seconds_total{pod="${podName}", namespace="default"}[5m]))`;

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

module.exports = router;
