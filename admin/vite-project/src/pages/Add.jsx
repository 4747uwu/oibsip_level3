import React, { useState } from 'react';

const AddPizza = () => {
  const [pizza, setPizza] = useState({
    title: '',
    description: '',
    prices: { small: '', medium: '', large: '' },
    calories: { small: '', medium: '', large: '' },
    isVeg: false,
    imageUrl: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPizza(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: parseFloat(value) || '' }
      }));
    } else {
      setPizza(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'product_images_preset');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/darcn1hgn/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        pizza.imageUrl = data.secure_url;
      }

      const savePizzaResponse = await fetch('http://localhost:5000/api/admin/pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(pizza),
      });

      if (savePizzaResponse.ok) {
        alert('Pizza added successfully!');
        setPizza({
          title: '',
          description: '',
          prices: { small: '', medium: '', large: '' },
          calories: { small: '', medium: '', large: '' },
          isVeg: false,
          imageUrl: '',
        });
        setImage(null);
        setImagePreview(null);
      } else {
        throw new Error('Failed to save pizza');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add pizza');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-black py-6 px-8">
          <h2 className="text-3xl font-bold text-white text-center">Add New Pizza</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="text-gray-700 font-semibold text-lg mb-2 block">Pizza Name</label>
              <input
                type="text"
                name="title"
                value={pizza.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                required
                placeholder="Enter pizza name"
              />
            </div>

            <div>
              <label className="text-gray-700 font-semibold text-lg mb-2 block">Description</label>
              <textarea
                name="description"
                value={pizza.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 min-h-[100px]"
                required
                placeholder="Describe your pizza"
              />
            </div>

            <div className=" bg-gradient-to-br from-blue-100 to-gray p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['small', 'medium', 'large'].map((size) => (
                  <div key={size} className="relative">
                    <label className="text-gray-700 font-medium mb-2 block capitalize">{size} Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        name={`prices.${size}`}
                        value={pizza.prices[size]}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" bg-gradient-to-br from-blue-100 to-gray p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Calorie Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['small', 'medium', 'large'].map((size) => (
                  <div key={size}>
                    <label className="text-gray-700 font-medium mb-2 block capitalize">{size} Size</label>
                    <input
                      type="number"
                      name={`calories.${size}`}
                      value={pizza.calories[size]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                      placeholder="Calories"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isVeg"
                checked={pizza.isVeg}
                onChange={(e) => setPizza(prev => ({ ...prev, isVeg: e.target.checked }))}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-lg font-medium text-gray-700">Vegetarian</label>
            </div>

            <div>
              <label className="text-gray-700 font-semibold text-lg mb-2 block">Upload Image</label>
              <div 
                className={`mt-1 flex flex-col justify-center px-6 pt-5 pb-6 border-2 ${imagePreview ? 'border-orange-500' : 'border-gray-300 border-dashed'} rounded-lg hover:border-blue-300 transition duration-200`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!imagePreview ? (
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                        <span className='ml-56'>  Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-64 rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      {image.name} ({Math.round(image.size / 1024)} KB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Pizza...
              </span>
            ) : (
              'Add Pizza'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPizza;