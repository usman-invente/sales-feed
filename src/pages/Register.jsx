import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { registerUser } from "../services/authService";
import PasswordInput from "./PasswordInput";
import "./Register.css";


export default function Register() {
  const [notice, setNotice] = useState("");

  const INITIAL_FORM_STATE = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // 2. Universal change handler for inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation check
    if (formData.password !== formData.confirmPassword) {
      setNotice("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setNotice("Password must be at least 8 characters long.");
      return;
    }

    setNotice("Creating your account...");

    try {
      // 2. Format payload (Exclude confirmPassword)
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        termsAccepted: formData.terms,
      };

      // 3. API Call
      await registerUser(payload);

      // 4. State Reset & Success Message
      setFormData(INITIAL_FORM_STATE);

      setNotice('Account created successfully! Please log in.');
    } catch (error) {

      setNotice(error.message || 'An error occurred during registration. Please try again.');

    } finally {
      
      //setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout variant="register">
      <div className="auth-form-wrap">
        <span className="auth-kicker auth-panel-kicker">COME ON IN</span>
        <h1>
          Make yourself
          <br />
          <em>at home.</em>
        </h1>
        <p className="auth-intro">
          Create an account and find your next favorite thing.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span>Your name</span>
            <input
              autoComplete="name"
              name="name"
              placeholder="What should we call you?"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </label>
          <label className="auth-field">
            <span>Email address</span>
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
          </label>
          <PasswordInput
            autoComplete="new-password"
            label="Password"
            name="password"
            placeholder="At least 8 characters"
            onChange={handleChange}
            value={formData.password}
          />
          <PasswordInput
            autoComplete="new-password"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Type your password again"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <label className="auth-terms">
            <input
              name="terms"
              required
              type="checkbox"
              onChange={handleChange}
              checked={formData.terms}
            />
            <span>I agree to be kind and keep good things going.</span>
          </label>
          <button className="auth-submit" type="submit">
            Create your account <span aria-hidden="true">↗</span>
          </button>
          {notice && (
            <p className="auth-notice" role="status">
              <span aria-hidden="true">✳</span> {notice}
            </p>
          )}
        </form>
        <p className="auth-switch">
          Already part of the neighborhood? <Link to="/login">Log in</Link>
        </p>
        <Link className="auth-back-link" to="/">
          ← Back to the good finds
        </Link>
      </div>
    </AuthLayout>
  );
}
