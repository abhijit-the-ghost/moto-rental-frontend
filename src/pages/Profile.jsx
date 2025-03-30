import { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import AuthService from "../services/AuthService";
import RentalService from "../services/RentalServices";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [passport, setPassport] = useState(null);

  console.log(user, "userData");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ✅ Fetch User Data
  const fetchUserProfile = async () => {
    setLoading(true);
    const data = await AuthService.getUserProfile();
    if (!data.error) {
      setUser(data);
      setUpdatedUser(data);
    }
    setLoading(false);
  };

  // ✅ Handle Input Changes in Modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // ✅ Handle File Upload
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log(`Selected ${type} file:`, file);

    if (type === "license") {
      setDrivingLicense(file);
    } else if (type === "passport") {
      setPassport(file);
    }
  };

  const handleReturn = async (rentalId) => {
    if (!window.confirm("Are you sure you want to return this motorcycle?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await RentalService.returnMotorcycle(rentalId); // Assuming this method exists
      if (response.success) {
        // Update UI: refetch user data or filter out the returned motorcycle
        await fetchUserProfile();
        alert("Motorcycle returned successfully!");
      } else {
        console.log(response.error || "Failed to return motorcycle");
      }
    } catch (err) {
      // setError("An error occurred while returning the motorcycle");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Save Updated Profile
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("firstName", updatedUser.firstName);
    formData.append("lastName", updatedUser.lastName);
    formData.append("phoneNumber", updatedUser.phoneNumber);
    formData.append("dob", updatedUser.dob);

    // ✅ Append Images If Selected
    if (drivingLicense) {
      formData.append("drivingLicense", drivingLicense);
    }
    if (passport) {
      formData.append("passport", passport);
    }

    // ✅ Log FormData Entries to Verify
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await AuthService.updateUserProfile(formData);
    if (!response.error) {
      setUser(updatedUser);
      setIsModalOpen(false);
      alert("Profile updated successfully!");
    } else {
      alert(response.error);
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="p-6 max-w-4xl h-[70vh] mx-auto text-center">
          Loading...
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-6 max-w-4xl min-h-[72vh] mx-auto">
        {/* Profile Card */}
        <div className="bg-base p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {user?.firstName} {user?.lastName}
              <button
                className="btn btn-xs btn-secondary"
                onClick={() => setIsModalOpen(true)}
              >
                Edit Profile
              </button>
            </h1>
            <p>{user?.email}</p>
            <p>Phone: {user?.phoneNumber}</p>
            <p>Date of Birth: {user?.dob ? user.dob.split("T")[0] : ""}</p>

            {/* Driving License & Passport Preview */}
            {user?.drivingLicense && (
              <div className="mt-3">
                <p className="text-gray-600 font-bold">Driving License:</p>
                <img
                  src={user.drivingLicense}
                  alt="Driving License"
                  className="w-40 h-24 object-cover rounded shadow-md"
                />
              </div>
            )}

            {user?.isForeigner && user?.passport && (
              <div className="mt-3">
                <p className="text-gray-600 font-bold">Passport:</p>
                <img
                  src={user.passport}
                  alt="Passport"
                  className="w-40 h-24 object-cover rounded shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        {/* Rented Motorcycles Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Rented Motorcycles</h2>

          {user?.rentedMotorcycles?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.rentedMotorcycles.map((moto) => (
                <div
                  key={moto._id}
                  className="card bg-white shadow-lg rounded-lg p-4"
                >
                  <img
                    src={`http://localhost:5000${moto.image}`}
                    alt={moto.motorcycle.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <div className="mt-3">
                    <h3 className="text-lg font-bold">
                      {moto.motorcycle.name}
                    </h3>
                    <p className="text-gray-500">{moto.motorcycle.company}</p>
                    <p className="text-gray-700">
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
                      Rent Start Date: {moto.rentStartDate.split("T")[0]}
                    </p>
                    <p className="text-gray-600">
                      Rent End Date: {moto.rentEndDate.split("T")[0]}
                    </p>
                    <button
                      className="btn btn-sm btn-primary mt-3"
                      onClick={() => handleReturn(moto._id)}
                      disabled={moto.status !== "Rented"}
                    >
                      Return Motorcycle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              You have not rented any motorcycles.
            </p>
          )}
        </div>

        {/* ✅ Edit Profile Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-brightness-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <form>
                <label className="label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full"
                  value={updatedUser?.firstName || ""}
                  onChange={handleChange}
                />

                <label className="label mt-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="input input-bordered w-full"
                  value={updatedUser?.lastName || ""}
                  onChange={handleChange}
                />

                <label className="label mt-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="input input-bordered w-full"
                  value={updatedUser?.phoneNumber || ""}
                  onChange={handleChange}
                />

                <label className="label mt-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="input input-bordered w-full"
                  value={updatedUser?.dob ? updatedUser.dob.split("T")[0] : ""}
                  onChange={handleChange}
                />

                <div className="flex justify-between mt-4">
                  <button
                    className="btn btn-success w-1/2"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-error w-1/2 ml-2"
                    onClick={() => setIsModalOpen(false)}
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
