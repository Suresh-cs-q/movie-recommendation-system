import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (!otp || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate password reset success
    const email = localStorage.getItem("resetEmail");
    if (email) {
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      users[email] = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
    }

    setMessage("Password has been reset successfully!");
    setError("");

    // Redirect to SignIn page after 2 seconds
    setTimeout(() => navigate("/signin"), 2000);
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Reset Password</h2>
        {message && <p className="reset-password-message">{message}</p>}
        {error && <p className="reset-password-error">{error}</p>}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="reset-password-input"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="reset-password-input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="reset-password-input"
        />
        <button
          type="button"
          onClick={handleResetPassword}
          className="reset-password-button"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
