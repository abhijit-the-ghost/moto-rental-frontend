import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {/* Navbar */}
      <div className="drawer relative z-50">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-300 w-full fixed shadow-lg z-50">
            <div className="flex-1 mx-2 px-2 text-3xl font-bold">
              Moto<span className="text-secondary">Rentals</span>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal space-x-4">
                {/* ✅ Navigation Links */}
                <li>
                  <a
                    className="hover:text-secondary"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-secondary"
                    onClick={() => navigate("/about-us")}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-secondary"
                    onClick={() => navigate("/our-motorcycles")}
                  >
                    Our Motorcycles
                  </a>
                </li>

                {/* ✅ If User is Logged In */}
                {user ? (
                  <>
                    <li>
                      <a onClick={() => navigate("/profile")}>
                        {user.firstName}
                      </a>
                    </li>
                    <li>
                      <a className="text-red-500" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </>
                ) : (
                  <li>
                    <a onClick={() => navigate("/login")}>Login</a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Page Content */}
          <div className="pt-16">{children}</div>
        </div>

        {/* Sidebar for Mobile Navigation */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* ✅ Sidebar Links */}
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate("/about-us")}>About Us</a>
            </li>
            <li>
              <a onClick={() => navigate("/our-motorcycles")}>
                Our Motorcycles
              </a>
            </li>

            {/* ✅ User Account Section */}
            {user ? (
              <>
                <li>
                  <a onClick={() => navigate("/profile")}>{user.firstName}</a>
                </li>
                <li>
                  <a className="text-red-500" onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a onClick={() => navigate("/login")}>Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* ✅ Footer Section */}
      <footer className="bg-base-200 py-6 mt-10 text-center">
        <div className="container mx-auto">
          <p className="text-lg font-bold">
            Moto<span className="text-secondary">Rentals</span>
          </p>
          <p className="text-sm">
            MotoRentals Pvt. Ltd &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
