import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const CustomPizzaBuilder = () => {
  const [ingredients, setIngredients] = useState({
    bases: [],
    sauces: [],
    cheeses: [],
    veggies: []
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState({
    base: null,
    sauce: null,
    cheese: null,
    veggies: []
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ingredients');
        setIngredients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ingredients');
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleIngredientSelect = (category, ingredient) => {
    if (category === 'veggies') {
      setSelectedIngredients(prev => ({
        ...prev,
        veggies: prev.veggies.includes(ingredient)
          ? prev.veggies.filter(item => item._id !== ingredient._id)
          : [...prev.veggies, ingredient]
      }));
    } else {
      setSelectedIngredients(prev => ({
        ...prev,
        [category]: ingredient
      }));
    }
  };

  const calculateTotal = () => {
    const basePrice = selectedIngredients.base?.price || 0;
    const saucePrice = selectedIngredients.sauce?.price || 0;
    const cheesePrice = selectedIngredients.cheese?.price || 0;
    const veggiesPrice = selectedIngredients.veggies.reduce((sum, item) => sum + item.price, 0);
    
    return basePrice + saucePrice + cheesePrice + veggiesPrice;
  };

   const handleAddToCart = () => {
  if (!selectedSize) {
    console.error('Pizza size is not selected');
    return;
  }

  const totalPrice = calculateTotal();

  const customPizza = {
    _id: Date.now(), // Temporary unique ID
    title: 'Custom Pizza',
    description: `Size: ${selectedSize}, Base: ${selectedIngredients.base?.name}, Sauce: ${selectedIngredients.sauce?.name}, Cheese: ${selectedIngredients.cheese?.name}, Veggies: ${selectedIngredients.veggies.map(v => v.name).join(', ')}`,
    prices: { [selectedSize]: totalPrice }, // Correctly structured prices object
    isCustom: true,
    ingredients: selectedIngredients,
    calories: calculateCalories()
  };

  addToCart(customPizza, selectedSize);

  // Reset selections after adding to cart
  setSelectedIngredients({
    base: null,
    sauce: null,
    cheese: null,
    veggies: []
  });
  setSelectedSize(null);
  setCurrentStep(1);
};

  const calculateCalories = () => {
    const baseCalories = selectedIngredients.base?.calories || 0;
    const sauceCalories = selectedIngredients.sauce?.calories || 0;
    const cheeseCalories = selectedIngredients.cheese?.calories || 0;
    const veggiesCalories = selectedIngredients.veggies.reduce((sum, item) => sum + (item.calories || 0), 0);

    return baseCalories + sauceCalories + cheeseCalories + veggiesCalories;
  };

  const renderIngredientSelection = (category, items, multiple = false) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(ingredient => (
        <div
          key={ingredient._id}
          onClick={() => handleIngredientSelect(category, ingredient)}
          className={`p-4 border rounded-lg cursor-pointer transition-all ${
            multiple
              ? selectedIngredients[category].some(item => item._id === ingredient._id)
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-gray-400'
              : selectedIngredients[category]?._id === ingredient._id
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-gray-400'
          }`}
        >
          <img
            src={ingredient.imageUrl}
            alt={ingredient.name}
            className="w-full h-32 object-cover rounded-lg mb-2"
          />
          <h3 className="font-medium">{ingredient.name}</h3>
          <p className={`text-sm ${
            multiple 
              ? selectedIngredients[category]?.some(item => item._id === ingredient._id)
              : selectedIngredients[category]?._id === ingredient._id
              ? 'text-black' 
              : 'text-white'
          } transition-colors duration-300`}>
            ₹{ingredient.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Build Your Own MAGIC!</h2>
      {/* <hr className='mb-8 text-gray-600'/> */}

      {currentStep === 1 && !selectedSize && (
        <div>
          <h3 className="text-xl font-bold mb-4">Choose Your Pizza Size</h3>
          <div className="grid grid-cols-3 gap-4">
            {['Small', 'Medium', 'Large'].map(size => (
              <div
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedSize === size
                    ? 'border-blue-500 bg-blue-50'
                    : 'hover:border-black'
                }`}
              >
                <h3 className="font-medium text-center">{size}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSize && (
        <div className="mb-8">
          <div className="flex justify-between mb-8">
            {['Choose Base', 'Select Sauce', 'Add Cheese', 'Pick Veggies'].map((step, index) => (
              <div
                key={step}
                className={`text-center flex-1 ${
                  currentStep === index + 1 ? 'text-white' : 'text-gray-600'
                }`}
              >
                <div className="w-8 h-8 rounded-full text-black bg-white mx-auto mb-2 flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSize && currentStep === 1 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Choose Your Base</h3>
          {renderIngredientSelection('base', ingredients.bases)}
        </div>
      )}

      {selectedSize && currentStep === 2 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Select Your Sauce</h3>
          {renderIngredientSelection('sauce', ingredients.sauces)}
        </div>
      )}

      {selectedSize && currentStep === 3 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Add Your Cheese</h3>
          {renderIngredientSelection('cheese', ingredients.cheeses)}
        </div>
      )}

      {selectedSize && currentStep === 4 && (
        <div>
          <h3 className="text-xl font-bold mb-4">Pick Your Veggies</h3>
          {renderIngredientSelection('veggies', ingredients.veggies, true)}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-6 py-2 bg-white text-black border border-black  rounded-full hover:bg-black hover:text-white"
          >
            Previous
          </button>
        )}
        
        {currentStep < 4 && selectedIngredients[Object.keys(selectedIngredients)[currentStep - 1]] && (
          <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-2 text-black bg-white border border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              Next
        </button>
        )}
        
        {currentStep === 4 && (
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add to Cart (₹{calculateTotal().toFixed(2)})
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomPizzaBuilder;
