function Navbar({
  cartCount,
  openCart,
  searchTerm,
  setSearchTerm,
  openLogin,
  openRegister,
  loggedInUser,
  isGuestUser,
  handleLogout
}) {

  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* Logo */}

        <button
          className="logo-button"
          onClick={() => window.location.reload()}
        >
          <span className="logo-icon">
            🛍️
          </span>

          <span className="logo-text">
            Store
          </span>
        </button>


        {/* Search */}

        <div className="search-container">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        {/* Navigation */}

        <nav className="nav-actions">

          {loggedInUser ? (

            <div className="user-section">

              <span className="welcome-text">
                Hi, {loggedInUser}
              </span>

              <button
                className="nav-button logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          ) : (

            <>

              {isGuestUser && (
                <span className="welcome-text">
                  Guest User
                </span>
              )}

              <button
                className="nav-button"
                onClick={openLogin}
              >
                Login
              </button>

              <button
                className="nav-button register-button"
                onClick={openRegister}
              >
                Register
              </button>

            </>

          )}


          {/* Cart */}

          <button
            className="cart-button"
            onClick={openCart}
          >

            <span>
              🛒
            </span>

            <span>
              Cart
            </span>

            <span className="cart-badge">
              {cartCount}
            </span>

          </button>


        </nav>

      </div>

    </header>

  );

}


export default Navbar;