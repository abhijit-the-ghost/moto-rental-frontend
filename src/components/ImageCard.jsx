const ImageCard = (props) => {
  const { name, description, image, price, company, status } = props;
  return (
    <>
      <div>
        <div className="card bg-base-100 w-80 shadow-sm">
          <figure>
            <img src={image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {name}
              <div className="badge badge-secondary">{company}</div>
            </h2>
            <p>{description}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{price}</div>
              <div className="badge badge-outline">{status}</div>
            </div>
            <button className="btn btn-primary">Rent Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
