import { useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function Login({ closeLogin, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/login/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            data.detail ||
            "Invalid username or password."
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.token || ""
      );

      localStorage.setItem(
        "username",
        data.username || username
      );

      onLogin(
        data.username || username
      );

    } catch (error) {
      setError(
        "Unable to connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">

      <div className="auth-card">

        <button
          className="auth-close-button"
          onClick={closeLogin}
        >
          ×
        </button>

        <div className="auth-header">

          <div className="auth-icon">
            🔐
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue shopping.
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          <div className="auth-form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter your username"
            />

          </div>


          <div className="auth-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
            />

          </div>


          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        <p className="auth-footer">
          Login securely to your account.
        </p>

      </div>

    </div>
  );
}

export default Login;