const ImageCard = () => {
  return (
    <>
      <div>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Motorcycle Name
              <div className="badge badge-secondary">Company</div>
            </h2>
            <p>A little description</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Model</div>
              <div className="badge badge-outline">Milage</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
