import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., kg, liters, units
  threshold: { type: Number, required: true }, // minimum quantity before alert
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model('Inventory', inventorySchema);