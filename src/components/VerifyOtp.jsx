const VerifyOtp = () => {
  return (
    <>
      <input type="checkbox" id="verify-otp-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Verify OTP</h3>
          <p className="py-4">Enter the OTP sent to your email/phone.</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="modal-action">
            <label htmlFor="verify-otp-modal" className="btn btn-error">
              Cancel
            </label>
            <button className="btn btn-primary">Verify</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
