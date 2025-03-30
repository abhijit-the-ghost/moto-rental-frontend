import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import ImageCard from "../components/ImageCard";
import { useEffect, useState } from "react";
import MotorcycleService from "../services/MotorcycleService";
import { FaMotorcycle } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [motorcycles, setMotorcycles] = useState([]);

  const fetchMotorcycles = async () => {
    setLoading(true);
    try {
      const response = await MotorcycleService.getAllMotorcycles();
      setMotorcycles(response.motorcycles);
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
      <section className="hero min-h-screen bg-primary text-primary-content flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl font-bold mb-5 flex items-center justify-center gap-3">
            Moto<span className="text-secondary">Rentals</span> <FaMotorcycle />
          </h1>
          <p className="text-lg mb-5">
            Find your perfect ride. Rent a motorcycle effortlessly with our
            platform.
          </p>
          <button
            className="btn btn-accent shadow-lg text-lg px-6 py-3"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="my-16 px-10 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">
          About MotoRentals
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At MotoRentals, we provide an easy and reliable way to rent
          motorcycles for your daily commute or adventurous road trips. Our
          platform ensures a seamless experience with a diverse range of
          motorcycles, flexible rental plans, and secure transactions.
        </p>
      </section>

      {/* Motorcycle Listing */}
      <section className="my-16 px-10 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Some of our motorcycles
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {loading ? (
            <div className="text-lg text-secondary">Loading motorcycles...</div>
          ) : motorcycles.length > 0 ? (
            motorcycles.map((motorcycle, index) => (
              <div key={index} className="w-72">
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
            ))
          ) : (
            <p className="text-lg text-gray-500">No motorcycles available</p>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Home;
