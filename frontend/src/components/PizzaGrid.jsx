import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const PizzaCard = ({ pizza }) => {
  const [selectedSize, setSelectedSize] = useState('medium');
  const { addToCart, calculateItemPrice } = useCart();

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const handleAddToCart = () => {
    addToCart({
      ...pizza,
      basePrice: pizza.prices.medium, // Store the base price for calculations
      selectedSize,
    }, selectedSize);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={pizza.imageUrl}
          alt={pizza.title}
          className="w-full h-full object-cover"
        />
        {/* Veg/Non-veg indicator */}
        <div className="absolute top-2 right-2">
          <div className={`w-6 h-6 border-2 ${
            pizza.isVeg ? 'border-green-500' : 'border-red-500'
          } bg-white rounded-sm relative`}>
            <div className={`w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
              pizza.isVeg ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{pizza.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{pizza.description}</p>
        
        {/* Calories */}
        <p className="text-sm text-gray-500 mb-4">
          Calories: {pizza.calories[selectedSize]}
        </p>

        {/* Size Selection */}
        <div className="flex gap-2 mb-4">
          {sizes.map(size => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedSize === size.value
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">
            ₹{pizza.prices[selectedSize].toFixed(2)}
          </p>
          <button 
            onClick={handleAddToCart}
            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const PizzaCardGrid = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pizzas');
        setPizzas(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pizzas');
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-0 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Pizza Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map(pizza => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default PizzaCardGrid;