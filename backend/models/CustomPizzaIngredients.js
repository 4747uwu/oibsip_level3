import mongoose from 'mongoose';

const customPizzaIngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
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
  category: {
    type: String,
    required: true,
    enum: ['base', 'sauce', 'cheese', 'veggies']
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const CustomPizzaIngredient = mongoose.model('CustomPizzaIngredient', customPizzaIngredientSchema);
export default CustomPizzaIngredient;