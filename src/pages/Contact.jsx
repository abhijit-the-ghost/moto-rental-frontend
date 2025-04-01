import React from "react";
import DefaultLayout from "../components/DefaultLayout";

const Contact = () => {
  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about renting a motorcycle? 
              <br/>
              We're here to help you hit the road!
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone Card */}
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-2xl text-gray-800">Call Us</h2>
                <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
                <p className="text-gray-600">+1 (555) 987-6543</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-2xl text-gray-800">Email Us</h2>
                <p className="text-gray-600 mt-2">rentals@motorbikes.com</p>
                <p className="text-gray-600">support@motorbikes.com</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="card-title text-2xl text-gray-800">Visit Us</h2>
                <p className="text-gray-600 mt-2">
                  MotoRentals HQ
                  <br />
                  Balaju, Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="card bg-white shadow-xl rounded-xl mx-auto max-w-3xl mb-16">
            <div className="card-body">
              <h2 className="card-title text-3xl text-gray-800 justify-center mb-6">
                Business Hours
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">Monday - Friday</p>
                  <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">Saturday</p>
                  <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">Sunday</p>
                  <p className="text-gray-600">Closed</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">Holidays</p>
                  <p className="text-gray-600">Call to Confirm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-blue-600 text-white py-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Need Help Right Away?</h3>
            <p className="text-lg max-w-xl mx-auto mb-6">
              Call us during business hours or drop us an email anytime—we’ll
              get back to you soon!
            </p>
            <a
              href="tel:+15551234567"
              className="btn btn-warning btn-lg text-white hover:bg-yellow-500 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Contact;
