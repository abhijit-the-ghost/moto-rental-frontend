const BookBike = () => {
  return (
    <>
      {/* Trigger Button */}
      <label htmlFor="book-bike-modal" className="btn btn-primary">
        Book a Bike
      </label>

      {/* Modal */}
      <input type="checkbox" id="book-bike-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">Book a Bike</h2>
          <p className="py-2">Fill in the details to book your ride.</p>

          {/* Booking Form */}
          <div className="flex flex-col gap-4">
            {/* Booking Date */}
            <label className="form-control w-full">
              <span className="label-text">Booking Date</span>
              <input type="date" className="input input-bordered w-full" />
            </label>

            {/* Location */}
            <label className="form-control w-full">
              <span className="label-text">Pickup Location</span>
              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full"
              />
            </label>

            {/* Drop-off Location */}
            <label className="form-control w-full">
              <span className="label-text">Drop-off Location</span>
              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full"
              />
            </label>

            {/* Additional Notes */}
            <label className="form-control w-full">
              <span className="label-text">Additional Notes</span>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Any special requests?"
              ></textarea>
            </label>
          </div>

          {/* Actions */}
          <div className="modal-action">
            <label htmlFor="book-bike-modal" className="btn">
              Cancel
            </label>
            <button className="btn btn-primary">Confirm Booking</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookBike;
