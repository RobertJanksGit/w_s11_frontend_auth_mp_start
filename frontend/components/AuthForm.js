import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const toggleFormMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setMessage("");
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");
    if (isLogin) {
      try {
        const { data } = await axios.post("/api/auth/login", {
          username,
          password,
        });
        localStorage.setItem("token", data.token);
        navigate("/stars");
      } catch (err) {
        evt.preventDefault();
        setError(
          err?.response?.data?.message || "An error occurred. Please try again."
        );
      }
    } else {
      try {
        const { data } = await axios.post("/api/auth/register", {
          username,
          password,
        });
        setMessage(data.message);
        // localStorage.setItem("token", data.token);
        navigate("/stars");
      } catch (err) {
        evt.preventDefault();
        setError(
          err?.response?.data?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="container">
      <div aria-live="polite">{message}</div>
      <div aria-live="assertive" style={{ color: "red" }}>
        {error}
      </div>
      <h3>
        {isLogin ? "Login" : "Register"}
        <button onClick={toggleFormMode}>
          Switch to {isLogin ? "Register" : "Login"}
        </button>
      </h3>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
