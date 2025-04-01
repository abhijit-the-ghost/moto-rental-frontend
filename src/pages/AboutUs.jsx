import DefaultLayout from "../components/DefaultLayout";
import {
  FaMotorcycle,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <DefaultLayout>
      <div className="bg-gradient-to-br from-gray-100 via-white to-blue-50">
        {/* Hero Section */}
        <section
          className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center text-white"
          style={{
            backgroundImage:
              "url('https://source.unsplash.com/1600x900/?motorcycle,road')",
          }}
        >
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Moto<span className="text-yellow-400">Rentals</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Your Trusted Partner for Motorcycle Adventures
            </p>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Mission & Vision</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At MotoRentals, we’re dedicated to delivering an{" "}
              <span className="font-semibold">
                affordable, convenient, and safe
              </span>{" "}
              motorcycle rental experience. Whether you’re hitting the open road
              or need a reliable ride in the city, we’ve got your back!
            </p>
          </div>
        </section>

        {/* Why Choose Us? */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
              Why Choose <span className="text-blue-600">MotoRentals</span>?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Wide Range of Bikes */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-2">
                <FaMotorcycle className="text-5xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Wide Range of Bikes
                </h3>
                <p className="text-gray-600 mt-2">
                  From sport bikes to cruisers, find the perfect ride for any
                  journey.
                </p>
              </div>

              {/* Affordable Prices */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-2">
                <FaHandshake className="text-5xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Affordable Prices
                </h3>
                <p className="text-gray-600 mt-2">
                  Transparent pricing with no hidden fees—ride worry-free.
                </p>
              </div>

              {/* Customer Support */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-2">
                <FaUsers className="text-5xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  24/7 Support
                </h3>
                <p className="text-gray-600 mt-2">
                  Our team is here around the clock to assist you.
                </p>
              </div>

              {/* Insurance & Safety */}
              <div className="card bg-white shadow-lg rounded-xl p-6 transform transition-all hover:shadow-xl hover:-translate-y-2">
                <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800">
                  Insurance & Safety
                </h3>
                <p className="text-gray-600 mt-2">
                  Fully insured bikes meeting top safety standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Ride?
            </h2>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-6">
              Discover the freedom of the road with MotoRentals today!
            </p>
            <button
              className="btn btn-warning btn-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => (window.location.href = "/our-motorcycles")}
            >
              Rent a Motorcycle
            </button>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutUs;
