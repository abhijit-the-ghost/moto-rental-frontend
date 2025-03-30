import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import MotorcycleService from "../services/MotorcycleService";
import ImageCard from "../components/ImageCard";

const OurMotorcycles = () => {
  const [loading, setLoading] = useState([]);
  const [motorcycles, setMotorcycles] = useState([]);

  const fetchAllMotorcycles = async () => {
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
    fetchAllMotorcycles();
  }, []);

  return (
    <DefaultLayout>
      <div className="min-h-[70vh] mt-20">
        <h1 className="text-3xl font-bold text-center mb-4">Our Motorcycles</h1>
        <div className="flex justify-center">
          <div className="w-11/12 flex gap-2 flex-wrap justify-start">
            {loading ? (
              <div className="text-lg text-secondary">
                Loading motorcycles...
              </div>
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
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OurMotorcycles;
