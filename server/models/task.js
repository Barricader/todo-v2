import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  checked: { type: 'Boolean', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Task', taskSchema);
