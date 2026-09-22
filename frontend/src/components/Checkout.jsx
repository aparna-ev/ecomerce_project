import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";


function Checkout({
  cart,
  closeCheckout,
  onOrderComplete,
  isAuthenticated,
  openLogin,
  openRegister
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // Calculate total price
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * item.quantity,
    0
  );


  async function handleSubmit(event) {

    event.preventDefault();

    setError("");


    // Check whether all fields are filled
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


    // Check whether cart has products
    if (cart.length === 0) {

      setError(
        "Your cart is empty."
      );

      return;
    }


    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {

      setError(
        "Please login or register to complete your order."
      );

      return;
    }


    try {

      setLoading(true);


      // Prepare order items
      const items = cart.map((item) => ({
        product: item.id,
        quantity: item.quantity
      }));


      // Send order to Django
      const response = await fetch(
        `${API_URL}/api/orders/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          },

          body: JSON.stringify({
            shipping_address: address,

            phone: phone,

            items: items
          })
        }
      );


      const data = await response.json();


      // Django returned an error
      if (!response.ok) {

        setError(
          data.error ||
          data.detail ||
          "Unable to place the order."
        );

        return;
      }


      // Order successfully created
      console.log(
        "Order created:",
        data
      );


      onOrderComplete();


    } catch (error) {

      console.error(
        "Order error:",
        error
      );

      setError(
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }
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

                <div className="error-message">
                  <p>{error}</p>

                  {error.includes("login or register") && (
                    <div className="checkout-auth-actions">
                      <button
                        type="button"
                        onClick={openLogin}
                      >
                        Login
                      </button>

                      <button
                        type="button"
                        onClick={openRegister}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>

              )}



              <button
                type="submit"
                className="primary-button checkout-button"
                disabled={loading}
              >

                {loading
                  ? "Placing Order..."
                  : "Place Order"}

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