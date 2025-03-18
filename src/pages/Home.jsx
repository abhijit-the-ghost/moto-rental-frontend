import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import ImageCard from "../components/ImageCard";

const Home = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <>
        {/* Hero section */}
        <section>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage:
                "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
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
        {/* featured bikes */}
        <section className="flex justify-center">
          <div className="w-11/12 my-5">
            <div className="font-semibold text-2xl">Featured Motorcycle</div>
            <ImageCard />
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default Home;
