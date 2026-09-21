import { useState } from "react";


function Checkout({
  cart,
  closeCheckout,
  onOrderComplete
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [error, setError] = useState("");


  // Calculate total price
  const total = cart.reduce(

    (sum, item) =>

      sum +
      Number(item.price) *
      item.quantity,

    0

  );


  function handleSubmit(event) {

    event.preventDefault();

    setError("");


    if (
      !name ||
      !email ||
      !phone ||
      !address
    ) {

      setError(
        "Please fill in all the fields."
      );

      return;

    }


    // Demo order completion
    onOrderComplete();

  }


  return (

    <main className="checkout-page">

      <div className="checkout-container">

        <button
          className="back-button"
          onClick={closeCheckout}
        >
          ← Back to Cart
        </button>


        <div className="checkout-grid">


          {/* Customer Information */}

          <section className="checkout-form-box">

            <p className="section-label">
              CHECKOUT
            </p>

            <h1>
              Delivery Details
            </h1>

            <p className="checkout-description">
              Enter your details to
              place your order.
            </p>


            <form
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  placeholder="Enter your name"
                />

              </div>


              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter your email"
                />

              </div>


              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(
                      event.target.value
                    )
                  }
                  placeholder="Enter your phone number"
                />

              </div>


              <div className="form-group">

                <label>
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target.value
                    )
                  }
                  placeholder="Enter your delivery address"
                  rows="4"
                />

              </div>


              {error && (

                <p className="error-message">
                  {error}
                </p>

              )}


              <button
                type="submit"
                className="primary-button checkout-button"
              >
                Place Order
              </button>

            </form>

          </section>


          {/* Order Summary */}

          <section className="order-summary">

            <p className="section-label">
              ORDER SUMMARY
            </p>

            <h2>
              Your Order
            </h2>


            <div className="summary-items">

              {cart.map((item) => (

                <div
                  className="summary-item"
                  key={item.id}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <strong>
                    ₹
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              ))}

            </div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>


            <p className="demo-payment-note">
              This is a demo checkout.
              No real payment is processed.
            </p>

          </section>

        </div>

      </div>

    </main>

  );

}


export default Checkout;