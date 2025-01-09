import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  calories: {
    small: Number,
    medium: Number,
    large: Number
  },
  prices: {
    small: Number,
    medium: Number,
    large: Number
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: 'Invalid image URL'
    }
  },
  isVeg: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

const Pizza = mongoose.model('Pizza', pizzaSchema);
export default Pizza;