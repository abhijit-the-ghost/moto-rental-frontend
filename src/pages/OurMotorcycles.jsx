import { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import MotorcycleService from "../services/MotorcycleService";
import ImageCard from "../components/ImageCard";
import { FaSearch, FaMotorcycle } from "react-icons/fa";

const OurMotorcycles = () => {
  const [loading, setLoading] = useState(true); // Fixed initial state to true
  const [motorcycles, setMotorcycles] = useState([]);
  const [filteredMotorcycles, setFilteredMotorcycles] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllMotorcycles = async () => {
    setLoading(true);
    try {
      const response = await MotorcycleService.getAllMotorcycles();
      const fetchedMotorcycles = response.motorcycles || [];
      setMotorcycles(fetchedMotorcycles);
      setFilteredMotorcycles(fetchedMotorcycles);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch motorcycles on mount
  useEffect(() => {
    fetchAllMotorcycles();
  }, []);

  // Filter motorcycles based on search term
  useEffect(() => {
    const filtered = motorcycles.filter((motorcycle) =>
      `${motorcycle.name} ${motorcycle.company}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredMotorcycles(filtered);
  }, [search, motorcycles]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
              <FaMotorcycle className="text-blue-600" />
              Our Motorcycles
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Explore our collection of premium motorcycles for rent
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search by name or company..."
              className="input input-bordered w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={loading}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Motorcycles Grid */}
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
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
                <p className="mt-4 text-lg text-gray-600">
                  Loading motorcycles...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredMotorcycles.length > 0 ? (
                filteredMotorcycles.map((motorcycle) => (
                  <ImageCard
                    key={motorcycle._id}
                    uuid={motorcycle._id}
                    name={motorcycle.name}
                    company={motorcycle.company}
                    description={motorcycle.description}
                    price={motorcycle.price}
                    status={motorcycle.status}
                    image={motorcycle.image}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full text-lg">
                  No motorcycles match your search.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default OurMotorcycles;
