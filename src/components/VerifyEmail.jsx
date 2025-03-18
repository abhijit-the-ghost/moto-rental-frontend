const VerifyEmail = () => {
  return (
    <>
      {/* Trigger Button */}
      <label htmlFor="verify-email-modal" className="btn">
        Verify Email
      </label>

      {/* Modal */}
      <input type="checkbox" id="verify-email-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h2 className="text-lg font-bold">Verify Your Email</h2>
          <p className="py-4">
            We've sent a verification link to your email. Please check your
            inbox and click the link to verify your email address.
          </p>
          <div className="modal-action">
            <label htmlFor="verify-email-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
