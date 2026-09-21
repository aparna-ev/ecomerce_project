function ProductDetails({
  product,
  closeProductDetails,
  addToCart,
  products,
  selectProduct
}) {
  if (!product) {
    return null;
  }

  const similarProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.name !== product.name
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-details-page">

      {/* Back Button */}

      <button
        className="back-button"
        onClick={closeProductDetails}
      >
        ← Back to Products
      </button>


      {/* Product Details */}

      <div className="product-details-container">

        {/* Image */}

        <div className="details-image-section">

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="details-product-image"
            />
          ) : (
            <div className="image-placeholder">
              No Image
            </div>
          )}

        </div>


        {/* Information */}

        <div className="details-info-section">

          <p className="product-category">
            FEATURED PRODUCT
          </p>

          <h1 className="details-product-name">
            {product.name}
          </h1>

          <div className="details-rating">
            {product.rating || "⭐"}
          </div>

          <p className="details-price">
            ₹
            {Number(product.price).toLocaleString(
              "en-IN"
            )}
          </p>

          <p className="details-description">
            {product.description}
          </p>


          {/* Product Information */}

          <div className="product-information">

            <div>
              <strong>Product:</strong>
              <span>{product.name}</span>
            </div>

            <div>
              <strong>Availability:</strong>
              <span>Available</span>
            </div>

            <div>
              <strong>Delivery:</strong>
              <span>Free Delivery</span>
            </div>

          </div>


          {/* Add to Cart */}

          <button
            className="details-add-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>


      {/* Similar Products */}

      {similarProducts.length > 0 && (

        <section className="similar-products-section">

          <div className="section-heading">

            <p className="section-label">
              YOU MAY ALSO LIKE
            </p>

            <h2>
              Similar Products
            </h2>

          </div>


          <div className="similar-products-grid">

            {similarProducts.map((item) => (

              <article
                key={item.id}
                className="similar-product-card"
              >

                <div
                  className="similar-product-image-container"
                  onClick={() =>
                    selectProduct(item)
                  }
                >

                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="similar-product-image"
                    />
                  ) : (
                    <div className="image-placeholder">
                      No Image
                    </div>
                  )}

                </div>


                <h3
                  onClick={() =>
                    selectProduct(item)
                  }
                >
                  {item.name}
                </h3>


                <p className="similar-product-price">
                  ₹
                  {Number(item.price).toLocaleString(
                    "en-IN"
                  )}
                </p>


                <button
                  className="small-add-button"
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  Add to Cart
                </button>

              </article>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default ProductDetails;