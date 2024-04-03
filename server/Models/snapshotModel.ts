import mongoose from 'mongoose';
const { Schema } = mongoose;

const snapshotSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  podName: String,
  date: { type: Date, default: Date.now() },
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
