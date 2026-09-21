function ProductCard({
  product,
  addToCart,
  selectProduct
}) {

  return (

    <article className="product-card">


      {/* Product Image */}

      <div
        className="product-image-container"
        onClick={() =>
          selectProduct(product)
        }
      >

        {product.image ? (

          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />

        ) : (

          <div className="image-placeholder">
            No Image
          </div>

        )}

      </div>


      {/* Product Information */}

      <div className="product-info">

        <p className="product-category">
          FEATURED PRODUCT
        </p>


        <h2
          className="product-name"
          onClick={() =>
            selectProduct(product)
          }
        >
          {product.name}
        </h2>


        <p className="product-description">
          {product.description}
        </p>


        {/* Rating */}

        <div className="product-rating">

          <span>
            {product.rating || "⭐"}
          </span>

        </div>


        {/* Price */}

        <div className="product-bottom">

          <strong className="product-price">
            ₹
            {Number(
              product.price
            ).toLocaleString("en-IN")}
          </strong>


          {/* Add to Cart */}

          <button
            className="add-cart-button"
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
          </button>

        </div>


        {/* View Details */}

        <button
          className="details-button"
          onClick={() =>
            selectProduct(product)
          }
        >
          View Details →
        </button>

      </div>

    </article>

  );

}


export default ProductCard;