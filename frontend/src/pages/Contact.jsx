import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen overflow-hidden rounded-t-lg ">
      {/* Hero Section */}
      <div className="relative h-64 bg-orange-600 mb-4 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg">
          <div className="container mx-auto px-6 h-full flex items-center  rounded-t-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-6 py-12 bg-gradient-to-br from-orange-50 to-orange-100 mb-4 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you! Drop by our restaurant or reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Visit Us</h3>
                  <p className="text-gray-600">123 Pizza Street, Foodie City, FC 12345</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Call Us</h3>
                  <p className="text-gray-600">9091494457</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email Us</h3>
                  <p className="text-gray-600">ForeverPizza@pizzashop.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-4 rounded-b-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest offers, new menu items, and exclusive deals!
            </p>

            {subscribed ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                Thanks for subscribing! Check your email for confirmation.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Subscribe Now</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="mt-6 text-sm text-gray-500">
              By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
            </div>
          </div>
        </div>
      </div>

      {/* Hours of Operation */}
      <div className="bg-orange-50 py-12 mb-6 rounded-b-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Hours of Operation</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Monday - Thursday</span>
                <span className="text-gray-600">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Friday - Saturday</span>
                <span className="text-gray-600">11:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Sunday</span>
                <span className="text-gray-600">12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;