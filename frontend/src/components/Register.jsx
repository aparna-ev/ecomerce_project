import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

function Register({ openLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all the fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/register/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            data.detail ||
            "Registration failed."
        );
        return;
      }

      setSuccess(
        "Registration successful. Please return to the Login page and log in with your new credentials."
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch {
      setError(
        "Unable to connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            📝
          </div>

          <h1>Register</h1>

          <p>
            Create an account, then log in to place orders.
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
              placeholder="Choose a username"
            />

          </div>


          <div className="auth-form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
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
              placeholder="Create a password"
            />

          </div>


          <div className="auth-form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm your password"
            />

          </div>


          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {success && (
            <p className="auth-success">
              {success}
            </p>
          )}


          <button
            type="submit"
            className="auth-submit-button"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>

        </form>


        <div className="auth-actions">
          <button
            type="button"
            className="auth-link-button"
            onClick={openLogin}
          >
            Return to Login
          </button>
        </div>

      </div>

    </main>
  );
}

export default Register;