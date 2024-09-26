import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Firebase imports
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore"; // Firestore functions
import "../css/User.css"; // Import CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket ,faUser } from "@fortawesome/free-solid-svg-icons";

function User() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ field1: "", field2: "" });
  const [showDetails, setShowDetails] = useState(false); // State to toggle the card
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set authenticated user
      } else {
        window.location.href = "/authentication"; // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Handles form input and updates the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handles form submission and stores data in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const sanitizedEmail = user.email.replace(/[/.]/g, "_");

      try {
        // Delete the previous document to remove old data
        await deleteDoc(doc(db, "users", sanitizedEmail));

        // Set new document with the form data (overwrite if already exists)
        await setDoc(doc(db, "users", sanitizedEmail), {
          field1: userData.field1,
          field2: userData.field2,
          email: user.email, // Save user's email
        });

        setSuccess("Data successfully saved!");
        setError(null);
      } catch (error) {
        console.error("Error saving document: ", error);
        setError("Error saving data to Firestore.");
        setSuccess(null);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/authentication"; // Redirect after logout
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  // Toggles the sign-out card visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
     {/* Header Section */}
    <header className="header">
        <h1 className="title"><FontAwesomeIcon icon={faUser} /> User</h1>
        <div className="user-profile" onClick={toggleDetails}>
        <span>{user?.displayName}</span>
          {user && <img src={user.photoURL} alt="User Profile" className="profile-img" />}
         
        </div>
      </header>
    <div className="user-container">
     
      

      {/* Conditional Sign-Out Card */}
      {showDetails && (
        <div className="user-details-card">
          <p>Name: {user?.displayName}</p>
          <p>Email:{user?.email}</p>
          <button onClick={handleLogout} className="logout-button">
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </button>
        </div>
      )}

      {/* Form Section */}
      <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
          <label>
            Field 1:
            <input
              type="text"
              name="field1"
              value={userData.field1}
              onChange={handleInputChange}
              placeholder="Enter field 1"
            />
          </label>
          <label>
            Field 2:
            <input
              type="text"
              name="field2"
              value={userData.field2}
              onChange={handleInputChange}
              placeholder="Enter field 2"
            />
          </label>
          <button type="submit">Save</button>
        </form>

        {success && <p className="success-message">{success}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
    </>
  );
}

export default User;
