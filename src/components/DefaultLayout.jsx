import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Function to get initials from firstName and lastName
  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0] : "";
    const lastInitial = lastName ? lastName[0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-gray-800 text-white shadow-lg z-50">
        <div className="navbar container mx-auto px-4">
          {/* Logo */}
          <div className="flex-1">
            <a
              className="text-2xl md:text-3xl font-extrabold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Moto<span className="text-yellow-400">Rentals</span>
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-none items-center">
            <ul className="menu menu-horizontal px-1 space-x-2">
              <li>
                <a
                  className="hover:text-yellow-400 hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
                  onClick={() => navigate("/")}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="hover:text-yellow-400 hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
                  onClick={() => navigate("/about-us")}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-yellow-400 hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
                  onClick={() => navigate("/our-motorcycles")}
                >
                  Motorcycles
                </a>
              </li>
              <li>
                <a
                  className="hover:text-yellow-400 hover:bg-gray-700 rounded-md px-3 py-2 transition-colors"
                  onClick={() => navigate("/contact-us")}
                >
                  Contact
                </a>
              </li>
            </ul>

            {/* User Avatar with Dropdown */}
            {user ? (
              <div className="dropdown dropdown-end ml-4">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar flex items-center justify-center"
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-400 text-gray-800 flex items-center justify-center text-lg font-bold">
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-gray-700 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                >
                  <li>
                    <a
                      className="hover:bg-gray-600"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:bg-gray-600 text-red-400"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <a
                className="btn btn-warning btn-sm text-white hover:bg-yellow-500 transition-colors ml-4"
                onClick={() => navigate("/login")}
              >
                Login
              </a>
            )}
          </div>
        </div>

        {/* Mobile Drawer */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-gray-800 text-white">
            <li className="mb-2">
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li className="mb-2">
              <a onClick={() => navigate("/about-us")}>About Us</a>
            </li>
            <li className="mb-2">
              <a onClick={() => navigate("/our-motorcycles")}>Motorcycles</a>
            </li>
            <li className="mb-2">
              <a onClick={() => navigate("/contact-us")}>Contact</a>
            </li>
            {user ? (
              <>
                <li className="mb-2">
                  <a onClick={() => navigate("/profile")}>{user.firstName}</a>
                </li>
                <li>
                  <a className="text-red-400" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a
                  className="btn btn-warning btn-sm text-white mt-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Moto<span className="text-yellow-400">Rentals</span>
              </h3>
              <p className="text-sm">
                Your trusted partner for motorcycle rentals. Ride the adventure!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    className="hover:text-yellow-400 transition-colors"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-yellow-400 transition-colors"
                    onClick={() => navigate("/about-us")}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-yellow-400 transition-colors"
                    onClick={() => navigate("/our-motorcycles")}
                  >
                    Motorcycles
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-yellow-400 transition-colors"
                    onClick={() => navigate("/contact-us")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-1">Connect With Us</h4>
              {/* <div className="flex space-x-1 mb-4"></div> */}
              <p className="text-sm">Email: support@motorentals.com</p>
              <p className="text-sm">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center text-sm border-t border-gray-800 pt-4">
            <p>
              © {new Date().getFullYear()} MotoRentals Pvt. Ltd. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
