import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import the Firebase auth object
import { onAuthStateChanged, signOut } from 'firebase/auth';
import "../css/Authority.css"; // Import CSS for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket  ,faUserSecret} from "@fortawesome/free-solid-svg-icons";

function Authority() {
  const [authority, setAuthority] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // State to toggle the card

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthority(user); // Set the authenticated authority
      } else {
        window.location.href = "/authentication"; // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/authentication"; // Redirect to auth page after logout
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
     <header className="auth-header">
       
        <div className="authority-profile" onClick={toggleDetails}>
        <span>{authority?.email}</span>
          {authority && <img src={authority.photoURL} alt="Authority Profile" className="profile-img" />}
         
        </div>
      </header>
      {showDetails && (
        <div className="authority-details-card">
          <p>Name: {authority?.displayName}</p>
          <p>Email:{authority?.email}</p>
          <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faRightFromBracket} />Logout
          </button>
        </div>
      )}
    <div className="authority-container">


     

      


    </div>
    </>
  );
}

export default Authority;
