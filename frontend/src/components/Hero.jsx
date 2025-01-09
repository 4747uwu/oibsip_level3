import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const FoodHeroSlider = ({ onOrderNowClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pizzas');
        setSlides(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch pizzas');
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (loading) {
    return (
      <div className="w-full h-screen max-h-[600px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen max-h-[600px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-screen max-h-[600px] flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">No pizzas found</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen max-h-[600px] overflow-hidden bg-gray-900 rounded-md overflow-hidden">
      {/* Slides */}
      <div className="relative h-full ">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Image */}
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent">
              {/* Content positioned at bottom right */}
              <div className="absolute bottom-16 right-8 md:right-16 text-right text-white max-w-md">
                {/* Veg/Non-veg Icon */}
                <div className="mb-4 flex justify-end">
                  <div className={`w-6 h-6 border-2 ${
                    slide.isVeg ? 'border-green-500' : 'border-red-500'
                  } rounded-sm relative`}>
                    <div className={`w-3 h-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      slide.isVeg ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg mb-2">{slide.description}</p>
                <p className="text-3xl font-bold mb-6">₹{slide.prices?.medium ? slide.prices.medium.toFixed(2) : '0.00'}</p>
                  <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                      onClick={onOrderNowClick}  // Use the passed function here
                    >
                      Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-colors duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FoodHeroSlider;