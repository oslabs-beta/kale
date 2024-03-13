('use strict');

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//Configuring prom-client
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
//Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
  name: 'node_request_operations_total',
  help: 'The total number of processed requests',
});

const histogram = new client.Histogram({
  name: 'node_request_duration_seconds',
  help: 'Histogram for the duration in seconds.',
  buckets: [1, 2, 5, 6, 10],
});

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

//set up metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
