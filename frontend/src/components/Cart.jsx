function Cart({
  cart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  closeCart,
  openCheckout
}) {

  // Calculate total price
  const total = cart.reduce(
    (sum, product) => {
      return (
        sum +
        Number(product.price) *
          product.quantity
      );
    },
    0
  );


  // Calculate total number of items
  const totalItems = cart.reduce(
    (sum, product) => {
      return sum + product.quantity;
    },
    0
  );


  // Empty cart
  if (cart.length === 0) {

    return (

      <main className="cart-page">

        <div className="cart-container">

          <button
            className="back-button"
            onClick={closeCart}
          >
            ← Continue Shopping
          </button>


          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h1>
              Your cart is empty
            </h1>

            <p>
              You haven't added any
              products to your cart yet.
            </p>

            <button
              className="primary-button"
              onClick={closeCart}
            >
              Start Shopping
            </button>

          </div>

        </div>

      </main>

    );

  }


  return (

    <main className="cart-page">

      <div className="cart-container">


        {/* Header */}

        <div className="cart-header">

          <div>

            <p className="section-label">
              SHOPPING CART
            </p>

            <h1>
              Your Cart
            </h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>

          </div>


          <button
            className="back-button"
            onClick={closeCart}
          >
            ← Continue Shopping
          </button>

        </div>


        <div className="cart-layout">


          {/* Cart Items */}

          <section className="cart-items">


            {cart.map((product) => (

              <article
                className="cart-item"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />


                <div className="cart-item-info">

                  <h2>
                    {product.name}
                  </h2>

                  <p className="cart-item-description">
                    {product.description}
                  </p>

                  <p className="cart-item-price">
                    ₹
                    {Number(
                      product.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>


                {/* Quantity */}

                <div className="cart-quantity">

                  <p>
                    Quantity
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          product
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>


                    <span>
                      {product.quantity}
                    </span>


                    <button
                      onClick={() =>
                        increaseQuantity(
                          product
                        )
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                </div>


                {/* Subtotal */}

                <div className="cart-item-subtotal">

                  <p>
                    Subtotal
                  </p>

                  <strong>
                    ₹
                    {(
                      Number(
                        product.price
                      ) *
                      product.quantity
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                {/* Remove */}

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(
                      product.id
                    )
                  }
                >
                  Remove
                </button>

              </article>

            ))}


            {/* Clear Cart */}

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </section>


          {/* Order Summary */}

          <aside className="cart-summary">

            <p className="section-label">
              SUMMARY
            </p>

            <h2>
              Order Summary
            </h2>


            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {totalItems}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {total.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>


            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                Free
              </span>

            </div>


            <div className="summary-divider"></div>


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


            <button
              className="primary-button checkout-button"
              onClick={openCheckout}
            >
              Proceed to Checkout
            </button>


            <p className="secure-note">
              This is a demo checkout.
              No real payment will be
              processed.
            </p>

          </aside>

        </div>

      </div>

    </main>

  );

}


export default Cart;