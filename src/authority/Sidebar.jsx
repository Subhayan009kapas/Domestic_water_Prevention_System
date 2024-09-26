import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/sidebar.css';
import { auth } from '../firebase'; // Import Firebase auth

function AuthoritySidebar() {
  const user = auth.currentUser; // Get the logged-in user

  return (
    <div className="sidenav">
      {/* {user && (
        <>
          <div className="user-image-container">
            <img
              src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'}
              alt="User Profile"
              className="user-profile-img"
              onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png'; }} // Fallback to default if error occurs
            />
          </div>
          <div className="name">
            <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{user.email}</p>
          </div>
          <br />
        </>
      )} */}
     <br></br>
      <img src="https://cdn-icons-png.flaticon.com/512/8967/8967188.png" height={"150px"} />
      <br />
      <h1>Admin</h1>
      <br></br>
      <br></br>

      <div className="nav-item">
        <NavLink to="/authority/setlimit" className="nav-link">
          Set Limit
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/authority/setprice" className="nav-link">
          Set Price
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/authority/viewalluser" className="nav-link">
          View Users
        </NavLink>
      </div>
    </div>
  );
}

export default AuthoritySidebar;
