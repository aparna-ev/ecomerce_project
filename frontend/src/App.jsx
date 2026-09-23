import "./App.css";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";


const API_URL = import.meta.env.VITE_API_URL || "";


function App() {

  // -----------------------------
  // Products
  // -----------------------------

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // -----------------------------
  // Cart
  // -----------------------------

  const [cart, setCart] = useState(() => {

    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];

  });


  // -----------------------------
  // Navigation / UI state
  // -----------------------------

  const [showCart, setShowCart] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showLogin, setShowLogin] = useState(
    !localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderCompleted, setOrderCompleted] = useState(false);


  // -----------------------------
  // Search
  // -----------------------------

  const [searchTerm, setSearchTerm] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("username")
  );

  const [isGuestUser, setIsGuestUser] = useState(
    !localStorage.getItem("token")
  );


  // =====================================================
  // GET PRODUCTS FROM DJANGO API
  // =====================================================

  useEffect(() => {

    async function fetchProducts() {

      try {

        setLoading(true);

        setError("");

        const response = await fetch(
          `${API_URL}/api/products/`
        );


        if (!response.ok) {

          throw new Error(
            "Failed to load products"
          );

        }


        const data = await response.json();


        const productsWithImages = data.map(
          (product) => ({

            ...product,

            image: product.image
              ? /^https?:\/\//i.test(product.image)
                ? product.image
                : `${API_URL}${product.image}`
              : "",

            rating:
              "⭐".repeat(
                Number(product.rating) || 0
              )

          })
        );


        setProducts(productsWithImages);

      }

      catch (error) {

        console.error(
          "Product loading error:",
          error
        );

        setError(
          "Unable to load products. Please try again."
        );

      }

      finally {

        setLoading(false);

      }

    }


    fetchProducts();

  }, []);


  // =====================================================
  // SAVE CART TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

  }, [cart]);


  // =====================================================
  // NAVIGATION FUNCTIONS
  // =====================================================

  function openCart() {

    setShowCart(true);

    setShowLogin(false);

    setShowRegister(false);

    setShowCheckout(false);

    setSelectedProduct(null);

  }


  function closeCart() {

    setShowCart(false);

  }


  function openLogin() {

    setShowLogin(true);

    setShowRegister(false);

    setShowCart(false);

    setShowCheckout(false);

    setSelectedProduct(null);

  }


  function openRegister() {

    setShowRegister(true);

    setShowLogin(false);

    setShowCart(false);

    setShowCheckout(false);

    setSelectedProduct(null);

  }


  function continueAsGuest() {

    setIsGuestUser(true);

    setShowLogin(false);

    setShowRegister(false);

  }


  function handleLogin(username) {

    setLoggedInUser(username);

    setIsGuestUser(false);

    setShowLogin(false);

    setShowRegister(false);

  }


  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("username");

    setLoggedInUser(null);

    setIsGuestUser(false);

    setCart([]);

    setShowLogin(true);

    setShowRegister(false);

    setShowCart(false);

    setShowCheckout(false);

    setSelectedProduct(null);

  }


  // =====================================================
  // PRODUCT DETAILS
  // =====================================================

  function selectProduct(product) {

    setSelectedProduct(product);

    setShowCart(false);

    setShowLogin(false);

    setShowRegister(false);

    setShowCheckout(false);

  }


  function closeProductDetails() {

    setSelectedProduct(null);

  }


  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  function addToCart(product) {

    setCart((previousCart) => {

      const existingProduct =
        previousCart.find(
          (item) => item.id === product.id
        );


      // Product already exists
      if (existingProduct) {

        return previousCart.map(
          (item) => {

            if (item.id === product.id) {

              return {

                ...item,

                quantity:
                  item.quantity + 1

              };

            }


            return item;

          }
        );

      }


      // New product
      return [

        ...previousCart,

        {

          ...product,

          quantity: 1

        }

      ];

    });

  }


  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  function increaseQuantity(product) {

    setCart(

      (previousCart) =>

        previousCart.map(
          (item) => {

            if (
              item.id === product.id
            ) {

              return {

                ...item,

                quantity:
                  item.quantity + 1

              };

            }


            return item;

          }
        )

    );

  }


  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  function decreaseQuantity(product) {

    setCart(

      (previousCart) =>

        previousCart

          .map((item) => {

            if (
              item.id === product.id
            ) {

              return {

                ...item,

                quantity:
                  item.quantity - 1

              };

            }


            return item;

          })

          .filter(
            (item) =>
              item.quantity > 0
          )

    );

  }


  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  function removeFromCart(productId) {

    setCart(

      (previousCart) =>

        previousCart.filter(
          (item) =>
            item.id !== productId
        )

    );

  }


  // =====================================================
  // CLEAR CART
  // =====================================================

  function clearCart() {

    setCart([]);

  }


  // =====================================================
  // CHECKOUT
  // =====================================================

  function openCheckout() {

    if (cart.length === 0) {

      return;

    }


    setShowCart(false);

    setShowCheckout(true);

    setShowLogin(false);

    setShowRegister(false);

    setSelectedProduct(null);

  }


  function closeCheckout() {

    setShowCheckout(false);

  }


  // =====================================================
  // ORDER COMPLETED
  // =====================================================

  function handleOrderComplete() {

    setCart([]);

    setShowCheckout(false);

    setOrderCompleted(true);

  }


  function closeOrderSuccess() {

    setOrderCompleted(false);

  }


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredProducts =
    products.filter((product) => {

      const name =
        product.name?.toLowerCase() || "";

      const description =
        product.description?.toLowerCase() || "";

      const search =
        searchTerm.toLowerCase();


      return (

        name.includes(search) ||

        description.includes(search)

      );

    });


  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cart.reduce(

    (total, item) =>

      total + item.quantity,

    0

  );


  // =====================================================
  // PAGE DISPLAY
  // =====================================================

  let page;


  if (showLogin) {

    page = (

      <Login
        onLogin={handleLogin}
        openRegister={openRegister}
        continueAsGuest={continueAsGuest}
      />

    );

  }

  else if (showRegister) {

    page = (

      <Register
        openLogin={openLogin}
      />

    );

  }

  else if (orderCompleted) {

    page = (

      <OrderSuccess
        closeOrderSuccess={
          closeOrderSuccess
        }
      />

    );

  }

  else if (showCheckout) {

    page = (

      <Checkout
        cart={cart}
        closeCheckout={
          closeCheckout
        }
        onOrderComplete={
          handleOrderComplete
        }
        isAuthenticated={
          Boolean(loggedInUser)
        }
        openLogin={openLogin}
        openRegister={openRegister}
      />

    );

  }

  else if (showCart) {

    page = (

      <Cart
        cart={cart}
        removeFromCart={
          removeFromCart
        }
        clearCart={
          clearCart
        }
        increaseQuantity={
          increaseQuantity
        }
        decreaseQuantity={
          decreaseQuantity
        }
        closeCart={
          closeCart
        }
        openCheckout={
          openCheckout
        }
      />

    );

  }

  else if (selectedProduct) {

    page = (

      <ProductDetails
        product={selectedProduct}
        closeProductDetails={
          closeProductDetails
        }
        addToCart={
          addToCart
        }
        products={products}
        selectProduct={
          selectProduct
        }
      />

    );

  }

  else {

    page = (

      <main className="home-page">

        <section className="hero-section">

          <div>

            <p className="hero-small-text">
              Welcome to Store
            </p>

            <h1>
              Find products
              <br />
              you love.
            </h1>

            <p>
              Browse our products,
              view details and add
              your favourites to the
              shopping cart.
            </p>

          </div>

        </section>


        <section className="products-section">

          <div className="section-heading">

            <div>

              <p className="section-label">
                OUR PRODUCTS
              </p>

              <h2>
                Explore Products
              </h2>

            </div>

            <p>
              {filteredProducts.length}{" "}
              product
              {filteredProducts.length !== 1
                ? "s"
                : ""}
            </p>

          </div>


          {loading && (

            <div className="message">

              <div className="loader"></div>

              <h3>
                Loading products...
              </h3>

              <p>
                Please wait while we
                get the latest products.
              </p>

            </div>

          )}


          {!loading && error && (

            <div className="message error-box">

              <h3>
                Something went wrong
              </h3>

              <p>{error}</p>

              <button
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>

          )}


          {!loading &&
            !error &&
            filteredProducts.length === 0 && (

              <div className="message">

                <h3>
                  No products found
                </h3>

                <p>
                  Try searching for
                  something else.
                </p>

              </div>

            )}


          {!loading &&
            !error &&
            filteredProducts.length > 0 && (

              <div className="product-grid">

                {filteredProducts.map(
                  (product) => (

                    <ProductCard
                      key={product.id}
                      product={product}
                      addToCart={
                        addToCart
                      }
                      selectProduct={
                        selectProduct
                      }
                    />

                  )
                )}

              </div>

            )}

        </section>

      </main>

    );

  }


  return (

    <>

      <Navbar
        cartCount={cartCount}
        openCart={openCart}
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        openLogin={openLogin}
        openRegister={openRegister}
        loggedInUser={loggedInUser}
        isGuestUser={isGuestUser}
        handleLogout={handleLogout}
      />


      {page}

    </>

  );

}


export default App;