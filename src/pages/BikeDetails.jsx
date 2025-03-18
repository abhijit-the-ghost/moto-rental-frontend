import DefaultLayout from "../components/DefaultLayout";

const BikeDetails = () => {
  return (
    <DefaultLayout>
      <>
        <div>
          <h1>Bike name</h1>
          <div> Image of motorcycle</div>
          <p>Bike description</p>
          <p>Millage</p>
          <p>Rent Price</p>
        </div>

        <button className="btn btn-primary">Rent</button>
      </>
    </DefaultLayout>
  );
};

export default BikeDetails;
