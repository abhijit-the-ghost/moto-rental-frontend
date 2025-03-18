import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import BookingBikes from "./pages/BookingBikes";
import BikeDetails from "./pages/BikeDetails";
import Profile from "./pages/profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking-bikes" element={<BookingBikes />} />
          <Route path="/bike-detail" element={<BikeDetails />} />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
