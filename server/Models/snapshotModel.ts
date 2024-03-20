const myURI: String =
  'mongodb+srv://codesmithbv:ax6POS3lHiGRGPfO@kalecluster.3wl6slc.mongodb.net/';
const mongoose = require('mongoose');
const { Schema } = mongoose;

try {
  mongoose.connect(myURI);
  console.log('connected to mongodb');
} catch (error) {
  console.log(error);
}

const snapshotSchema = new Schema({
  podName: String,
  date: Date,
  metrics: {
    gpuUsage: {
      metric: String,
      time: [String],
      value: [Number],
    },
    memoryUsage: {
      metric: String,
      time: [String],
      value: [Number],
    },
  },
});

const Snapshot = mongoose.model('Snapshot', snapshotSchema);

export default Snapshot;