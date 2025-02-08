import { useState } from "react";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return "";
  };

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*]/;

    if (!minLength.test(password)) return "Password must be at least 6 characters long.";
    if (!upperCase.test(password)) return "Password must contain at least one uppercase letter.";
    if (!lowerCase.test(password)) return "Password must contain at least one lowercase letter.";
    if (!number.test(password)) return "Password must contain at least one number.";
    if (!specialChar.test(password)) return "Password must contain at least one special character (!@#$%^&*).";

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (emailError) {
      setError(emailError);
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }

    onLogin(email, password, setError);
  };

  return (
    <div className="login_form">
      <form onSubmit={handleSubmit}>
        <div className="login_form-rows">
          <label htmlFor="email">Login</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@gmail.com"
            required
          />
        </div>
        <div className="login_form-rows">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test@123"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className="btn__login" type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default Login;
