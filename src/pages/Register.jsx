import { useState } from "react";

const Register = () => {
  const [isForeigner, setIsForeigner] = useState(false);
  const [licenseImage, setLicenseImage] = useState();
  const [passportImage, setPassportImage] = useState();

  // Handle Image Upload
  const handleFileChange = (event, setImage) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>
        <form className="mt-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
          </div>

          {/* Date of Birth */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input type="date" className="input input-bordered w-full" />
          </div>

          {/* Blood Group */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select className="select select-bordered w-full">
              <option value="" disabled selected>
                Select Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Driving License Image */}
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Upload Driving License</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => handleFileChange(e, setLicenseImage)}
            />
            {licenseImage && (
              <p className="text-sm text-green-600 mt-1">
                Image Uploaded: {licenseImage.name}
              </p>
            )}
          </div>

          {/* Foreigner Checkbox */}
          <div className="form-control mt-4">
            <label className="cursor-pointer label">
              <span className="label-text">Are you a Foreigner?</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onChange={() => setIsForeigner(!isForeigner)}
              />
            </label>
          </div>

          {/* Passport Image (Shown Only if Foreigner) */}
          {isForeigner && (
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Upload Passport</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => handleFileChange(e, setPassportImage)}
              />
              {passportImage && (
                <p className="text-sm text-green-600 mt-1">
                  Image Uploaded: {passportImage.name}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button className="btn btn-primary w-full mt-6">Register</button>
        </form>

        {/* Already have an account? */}
        <div className="text-center mt-4">
          <span className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
