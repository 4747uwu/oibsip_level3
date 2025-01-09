import React from "react";

const Footer = () => {
  return (
    <footer className=" text-black py-10">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between">
          {/* Logo & About */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h2 className="text-2xl font-bold">🍕 Pizza Delight</h2>
            <p className="mt-4 text-sm">
              Serving you the finest, freshest, and cheesiest pizzas in town!
              Your satisfaction is our top priority.
            </p>
          </div>

          {/* Links */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline">
                  Menu
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">📍 123 Pizza Street, Foodville</p>
            <p className="text-sm">📞 +1-234-567-890</p>
            <p className="text-sm">📧 support@pizzadelight.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/50 my-6"></div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-yellow-300">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="#" className="hover:text-yellow-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="hover:text-yellow-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="#" className="hover:text-yellow-300">
            <i className="fab fa-pinterest text-2xl"></i>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm mt-6">
          <p>&copy; 2025 Pizza Delight. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
