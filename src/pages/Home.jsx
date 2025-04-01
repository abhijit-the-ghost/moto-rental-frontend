import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import MotorcycleService from "../services/MotorcycleService";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);

  const fetchMotorcycles = async () => {
    setLoading(true);
    try {
      const response = await MotorcycleService.getAllMotorcycles();
      setMotorcycles(response.motorcycles.slice(0, 3)); // Limit to 3 for showcase
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotorcycles();
  }, []);

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?motorcycle')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Moto<span className="text-yellow-400">Rentals</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover your next adventure.
            <br />
            Rent premium motorcycles with ease.
          </p>
          <button
            className="btn btn-warning btn-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Start Your Ride
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-100 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">MotoRentals</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            MotoRentals is your gateway to freedom on two wheels. We offer a
            curated selection of top-tier motorcycles for every rider—whether
            you're commuting through the city or exploring open roads. Enjoy a
            hassle-free rental experience with flexible options and unbeatable
            service.
          </p>
        </div>
      </section>

      {/* Motorcycle Listing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
            Featured <span className="text-blue-600">Rides</span>
          </h2>
          {loading ? (
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-blue-600 mx-auto"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="mt-4 text-lg text-gray-600">Loading rides...</p>
            </div>
          ) : motorcycles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {motorcycles.map((motorcycle) => (
                <div
                  key={motorcycle._id}
                  className="transform transition-all hover:scale-105"
                >
                  <ImageCard
                    uuid={motorcycle._id}
                    name={motorcycle.name}
                    company={motorcycle.company}
                    description={motorcycle.description}
                    price={motorcycle.price}
                    status={motorcycle.status}
                    image={motorcycle.image}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">
              No motorcycles available at the moment
            </p>
          )}
          <div className="text-center mt-12">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => navigate("/our-motorcycles")}
            >
              View All Motorcycles
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">Ready to Hit the Road?</h3>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Sign up today and experience the thrill of riding with MotoRentals.
        </p>
        <button
          className="btn btn-warning btn-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          onClick={() => navigate("/register")}
        >
          Join Now
        </button>
      </section>
    </DefaultLayout>
  );
};

export default Home;
