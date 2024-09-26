// Authentic.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Import the Firebase auth object
import '../css/Authentic.css'; // Import CSS for styling


const Authentic = () => {
   const [isUserLogin, setIsUserLogin] = useState(true); // Toggle between User and Authority
   const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Register
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(''); // State for error messages

   const handleToggleRole = () => setIsUserLogin(!isUserLogin); // Toggle between User and Authority
   const handleToggleMode = () => setIsLoginMode(!isLoginMode); // Toggle between Login and Register

   const handleLogin = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         window.location.href = isUserLogin ? "/user" : "/authority"; // Redirect based on role
      } catch (error) {
         setError(`Login Error: ${error.message}`);
      }
   };

   const handleRegister = async () => {
      try {
         await createUserWithEmailAndPassword(auth, email, password);
         window.location.href = isUserLogin ? "/user" : "/authority"; // Redirect based on role
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            setError('This email is already in use. Please use a different email.');
         } else {
            setError(`Registration Error: ${error.message}`);
         }
      }
   };

   const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
         await signInWithPopup(auth, provider);
         window.location.href = isUserLogin ? "/user/waterflow" : "/authority/setlimit"; // Redirect based on role
      } catch (error) {
         setError(`Google Login Error: ${error.message}`);
      }
   };

   return (
      <div className="auth-container">
         <div className="auth2-header">
            <button 
               className={`role-button ${isUserLogin ? 'active' : ''}`} 
               onClick={handleToggleRole}
            >
               User
            </button>
            <button 
               className={`role-button ${!isUserLogin ? 'active' : ''}`} 
               onClick={handleToggleRole}
            >
               Authority
            </button>
         </div>
         <div className="auth-card">
            <h1>{isUserLogin ? (isLoginMode ? "User Login" : "User Register") : (isLoginMode ? "Authority Login" : "Authority Register")}</h1>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Email"
               className="auth-input"
            />
            <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               className="auth-input"
            />
            {error && <p className="error-message">{error}</p>}
            {isLoginMode ? (
               <>
                  <button onClick={handleLogin} className="auth-button">Login</button>
                  <button onClick={handleGoogleLogin} className="google-button">Login with Google </button>
                  <p style={{color:"white"}}>Don't have an account? <button onClick={handleToggleMode} className="toggle-button">Register</button></p>
               </>
            ) : (
               <>
                  <button onClick={handleRegister} className="auth-button">Register</button>
                  <button onClick={handleGoogleLogin} className="google-button">Register with Google </button>
                  <p style={{color:"white"}} >Already have an account? <button onClick={handleToggleMode} className="toggle-button">Login</button></p>
               </>
            )}
         </div>
      </div>
   );
};

export default Authentic;
