import DefaultLayout from "../components/DefaultLayout"; // ✅ Using your layout
import {
  FaMotorcycle,
  FaUsers,
  FaHandshake,
  FaShieldAlt,
} from "react-icons/fa"; // ✅ Icons

const AboutUs = () => {
  return (
    <DefaultLayout>
      <div>
        {/* ✅ Hero Section */}
        <div
          className="w-full h-[60vh] flex items-center justify-center bg-base bg-center"
          // style={{
          //   backgroundImage:
          //     "url('https://source.unsplash.com/1600x900/?motorcycle,road')",
          // }}
        >
          <div className=" text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Moto Rentals</h1>
            <p className="text-lg md:text-xl mt-4">
              Your Trusted Motorcycle Rental Service
            </p>
          </div>
        </div>

        {/* ✅ Our Mission & Vision */}
        <section className="h-[60vh] flex justify-center items-center bg-base-200 ">
          <div className="w-1/2 text-center">
            <h2 className="text-3xl font-bold">Our Mission & Vision</h2>
            <p className="mt-4">
              At Moto Rentals, we aim to provide an **affordable, convenient,
              and safe** motorcycle rental experience for all riders. Whether
              you're exploring new places or need a temporary ride, we have you
              covered!
            </p>
          </div>
        </section>

        {/* ✅ Why Choose Us? */}
        <section className="min-h-[90vh] flex justify-center items-center">
          <div className="">
            <h2 className="text-3xl text-center font-bold">
              Why Choose Moto Rentals?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
              {/* ✅ Wide Range of Bikes */}
              <div className="card bg-base-100 shadow-lg p-6 hover:bg-primary hover:text-primary-content">
                <FaMotorcycle className="text-5xl mx-auto" />
                <h3 className="text-xl font-bold mt-4">Wide Range of Bikes</h3>
                <p className="mt-2">
                  Choose from a variety of motorcycles suited for every rider.
                </p>
              </div>

              {/* ✅ Affordable Prices */}
              <div className="card bg-base-100 shadow-lg p-6 hover:bg-primary hover:text-primary-content">
                <FaHandshake className="text-5xl mx-auto" />
                <h3 className="text-xl font-bold mt-4">Affordable Prices</h3>
                <p className="mt-2">
                  Enjoy competitive rental rates with no hidden fees.
                </p>
              </div>

              {/* ✅ Customer Support */}
              <div className="card bg-base-100 shadow-lg p-6 hover:bg-primary hover:text-primary-content">
                <FaUsers className="text-5xl mx-auto" />
                <h3 className="text-xl font-bold mt-4">24/7 Support</h3>
                <p className="mt-2">
                  Our team is always available to assist you.
                </p>
              </div>

              {/* ✅ Insurance & Safety */}
              <div className="card bg-base-100 shadow-lg p-6 hover:bg-primary hover:text-primary-content">
                <FaShieldAlt className="text-5xl mx-auto" />
                <h3 className="text-xl font-bold mt-4">Insurance & Safety</h3>
                <p className="mt-2">
                  We ensure all our bikes meet safety standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Call to Action */}
        <section className="py-16 bg-base-200 text-base-content text-center">
          <h2 className="text-3xl font-bold">Ready to Ride?</h2>
          <p className="mt-4">Explore the best motorcycles for rent today!</p>
          <button className="btn btn-secondary mt-6">Rent a Motorcycle</button>
        </section>
      </div>
    </DefaultLayout>
  );
};

export default AboutUs;
