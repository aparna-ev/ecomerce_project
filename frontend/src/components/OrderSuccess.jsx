function OrderSuccess({
  closeOrderSuccess
}) {

  return (

    <main className="success-page">

      <div className="success-box">

        <div className="success-icon">
          ✓
        </div>


        <p className="section-label">
          ORDER CONFIRMED
        </p>


        <h1>
          Thank you for your order!
        </h1>


        <p>
          Your order has been
          successfully placed.
        </p>


        <p className="success-note">
          This is a demo e-commerce
          project, so no real payment
          has been processed.
        </p>


        <button
          className="primary-button"
          onClick={
            closeOrderSuccess
          }
        >
          Continue Shopping
        </button>

      </div>

    </main>

  );

}


export default OrderSuccess;