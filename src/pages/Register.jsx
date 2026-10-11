import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { registerUser } from "../services/authService";
import PasswordInput from "./PasswordInput";
import "./Register.css";


export default function Register() {
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({});

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
    setErrors({});
 
  

    setNotice("Creating your account...");

    try {
      // 2. Format payload (Exclude confirmPassword)
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        termsAccepted: formData.terms,
        confirmPassword: formData.confirmPassword, 
      };

      // 3. API Call
      await registerUser(payload);

      // 4. State Reset & Success Message
      setFormData(INITIAL_FORM_STATE);

      setNotice('Account created successfully! Please log in.');
    } catch (error) {
      setErrors({});
      setNotice('');

      if (error.errors) {
        setErrors(error.errors);
      } else {
        setNotice(error.message || 'An error occurred during registration. Please try again.');
      }
     

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
              
              onChange={handleChange}
              value={formData.name}
            />

            {errors.name && (
              <span className="field-error">
                {Array.isArray(errors.name) ? errors.name[0] : errors.name}
              </span>
            )}

          </label>
          <label className="auth-field">
            <span>Email address</span>
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              type="text"
              onChange={handleChange}
              value={formData.email}
            />

            {errors.email && (
              <span className="field-error">
                {Array.isArray(errors.email) ? errors.email[0] : errors.email}
              </span>
            )}

          </label>
          <PasswordInput
            autoComplete="new-password"
            label="Password"
            name="password"
            placeholder="At least 8 characters"
            onChange={handleChange}
            value={formData.password}
          />

            {errors.password && (
              <span className="field-error">
                {Array.isArray(errors.password) ? errors.password[0] : errors.password}
              </span>
            )}
          <PasswordInput
            autoComplete="new-password"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Type your password again"
            onChange={handleChange}
            value={formData.confirmPassword}
          />

          {errors.confirmPassword && (
            <span className="field-error">
              {Array.isArray(errors.confirmPassword) ? errors.confirmPassword[0] : errors.confirmPassword}
            </span>
          )}

          <label className="auth-terms">
            <input
              name="terms"
              type="checkbox"
              onChange={handleChange}
              checked={formData.terms}
            />
            <span>I agree to be kind and keep good things going.</span>
            {errors.terms && (
              <span className="field-error">
                {Array.isArray(errors.terms) ? errors.terms[0] : errors.terms}
              </span>
            )}
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
