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
      const response = await MotorcycleService.getAllMotorcycles(); // ✅ Call the function properly
      setMotorcycles(response.motorcycles); // ✅ Ensure the correct field is used
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
      <>
        {/* Hero section */}
        <section>
          <div className="hero min-h-screen bg-base-200">
            {/* <div className="hero-overlay"></div> */}
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Moto<span className="text-accent">Rentals</span>
                </h1>
                <p className="mb-5">Hello There</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Some of our bikes */}
        <section className="flex justify-center  my-5">
          <div className="w-11/12 flex flex-col gap-5">
            <div className="font-semibold text-3xl">
              Some of our motorcycles
            </div>
            <div className="flex flex-wrap gap-10">
              {!loading ? (
                <>
                  {motorcycles.length > 0 &&
                    motorcycles.map((motorcycle, index) => (
                      <div key={index} className="w-1/3">
                        <ImageCard
                          name={motorcycle.name}
                          company={motorcycle.company}
                          description={motorcycle.description}
                          price={motorcycle.price}
                          status={motorcycle.status}
                          image={motorcycle.image}
                        />
                      </div>
                    ))}
                </>
              ) : (
                "No motorcycles available"
              )}
            </div>
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default Home;
