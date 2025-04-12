import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Branding Section */}
          <div>
            <h5 className="text-lg font-semibold">Gaming E-Commerce</h5>
            <p className="text-gray-400 mt-2">
              Your one-stop-shop for all things gaming!
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h5 className="text-lg font-semibold">Quick Links</h5>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <div className="mt-3 flex justify-center md:justify-start space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-blue-500"
              >
                <i className="bi bi-facebook text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-blue-400"
              >
                <i className="bi bi-twitter text-xl"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-pink-500"
              >
                <i className="bi bi-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Gaming E-Commerce. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
