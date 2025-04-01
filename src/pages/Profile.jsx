import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AuthService from "../services/AuthService";
import RentalService from "../services/RentalServices";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [drivingLicense, setDrivingLicense] = useState(null);
  // const [passport, setPassport] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Fetch User Data
  const fetchUserProfile = async () => {
    setLoading(true);
    const data = await AuthService.getUserProfile();
    if (!data.error) {
      setUser(data);
      setUpdatedUser(data);
    }
    setLoading(false);
  };

  // Handle Input Changes in Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle File Upload
  // const handleFileChange = (e, type) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   if (type === "license") {
  //     setDrivingLicense(file);
  //   } else if (type === "passport") {
  //     setPassport(file);
  //   }
  // };

  // Handle Motorcycle Return
  const handleReturn = async (rentalId) => {
    if (!window.confirm("Are you sure you want to return this motorcycle?"))
      return;

    setLoading(true);
    try {
      const response = await RentalService.returnMotorcycle(rentalId);
      if (response.success) {
        await fetchUserProfile();
        alert("Motorcycle returned successfully!");
      } else {
        alert(response.error || "Failed to return motorcycle");
      }
    } catch (err) {
      alert("An error occurred while returning the motorcycle");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Save Updated Profile
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", updatedUser.firstName || "");
    formData.append("lastName", updatedUser.lastName || "");
    formData.append("phoneNumber", updatedUser.phoneNumber || "");
    formData.append("dob", updatedUser.dob || "");

    // if (drivingLicense) formData.append("drivingLicense", drivingLicense);
    // if (passport) formData.append("passport", passport);

    setLoading(true);
    const response = await AuthService.updateUserProfile(formData);
    setLoading(false);

    if (!response.error) {
      setUser(updatedUser);
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } else {
      alert(response.error);
    }
  };

  if (loading && !user) {
    return (
      <DefaultLayout>
        <div className="min-h-screen flex items-center justify-center">
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
            <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
          </div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
                <p className="text-gray-600">
                  Phone: {user?.phoneNumber || "Not set"}
                </p>
                <p className="text-gray-600">
                  Date of Birth:{" "}
                  {user?.dob
                    ? new Date(user.dob).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
              <button
                className="btn btn-primary mt-4 md:mt-0"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
            </div>

            {/* Documents Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {user?.drivingLicense && (
                <div>
                  <p className="text-gray-700 font-semibold">Driving License</p>
                  <img
                    src={user.drivingLicense}
                    alt="Driving License"
                    className="w-48 h-32 object-cover rounded-lg shadow-md mt-2 hover:scale-105 transition-transform"
                  />
                </div>
              )}
              {user?.isForeigner && user?.passport && (
                <div>
                  <p className="text-gray-700 font-semibold">Passport</p>
                  <img
                    src={user.passport}
                    alt="Passport"
                    className="w-48 h-32 object-cover rounded-lg shadow-md mt-2 hover:scale-105 transition-transform"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Rented Motorcycles Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Rented Motorcycles
            </h2>
            {user?.rentedMotorcycles?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.rentedMotorcycles.map((moto) => (
                  <div
                    key={moto._id}
                    className="card bg-gray-50 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={
                        moto.image.startsWith("http")
                          ? moto.image
                          : `http://localhost:5000${moto.image}`
                      }
                      alt={moto.motorcycle.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {moto.motorcycle.name}
                    </h3>
                    <p className="text-gray-600">{moto.motorcycle.company}</p>
                    <p className="text-gray-700 mt-2">
                      Status:{" "}
                      <span
                        className={
                          moto.status === "Rented"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {moto.status}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Start: {new Date(moto.rentStartDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      End: {new Date(moto.rentEndDate).toLocaleDateString()}
                    </p>
                    <button
                      className="btn btn-sm btn-primary mt-4 w-full"
                      onClick={() => handleReturn(moto._id)}
                      disabled={moto.status !== "Rented" || loading}
                    >
                      {loading ? "Processing..." : "Return Motorcycle"}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                You have not rented any motorcycles yet.
              </p>
            )}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Edit Profile
              </h2>
              <form onSubmit={handleSave}>
                <div className="space-y-4">
                  <div>
                    <label className="label text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      value={updatedUser?.firstName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      value={updatedUser?.lastName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      value={updatedUser?.phoneNumber || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="label text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      value={
                        updatedUser?.dob ? updatedUser.dob.split("T")[0] : ""
                      }
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-[48%]"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-[48%]"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Profile;
