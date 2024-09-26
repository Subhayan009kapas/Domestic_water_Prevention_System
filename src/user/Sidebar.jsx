import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/sidebar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { auth } from '../firebase'; // Import Firebase auth

function UserSidebar() {
  const user = auth.currentUser; // Get the logged-in user

  return (
    <>
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
          <div className="name"><p style={{fontSize:"1.3rem",fontWeight:"bold"}}>{user?.email}</p></div>
          </>
          
          
        )} */}
        <br></br>
        <img src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png" height={"150px"}/>
        <br></br>
        <h1>User</h1>
        <br></br>
        <br></br>
        
        
        <div className="nav-item">
          <NavLink to="/user/waterflow" className="nav-link">
            Dashboard
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/user/servocontrol" className="nav-link">
            Gate Control
          </NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/user/analytics" className="nav-link">
            Go to Analytics
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserSidebar;
