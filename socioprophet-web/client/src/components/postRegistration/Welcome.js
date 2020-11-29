import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../authentication/contexts/AuthContext";
import "./styles/welcome.css";

const Welcome = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div className="container">
      <h1 className="container__heading">Welcome to Alpha Registry</h1>
      {error && <h3>{error}</h3>}
      <div styles={{ color: "#fff" }}>
        <strong>Email:</strong> {currentUser.email}
        <Link to="/update-profile">Update Profile</Link>
      </div>
      <button onClick={handleLogout}>Return</button>
    </div>
  );
};

export default Welcome;
