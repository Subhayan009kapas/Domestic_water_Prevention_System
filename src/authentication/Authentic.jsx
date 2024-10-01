// Authentic.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust import as needed
import '../css/authentic.css'; // Adjust CSS path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Adjust import as needed

const Authentic = () => {
   const [isUserLogin, setIsUserLogin] = useState(true);
   const [isLoginMode, setIsLoginMode] = useState(true);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState(''); // For registration
   const [phone, setPhone] = useState(''); // For registration
   const [address, setAddress] = useState(''); // For registration
   const [aadhaar, setAadhaar] = useState(''); // For registration
   const [error, setError] = useState('');
   const navigate = useNavigate(); // Hook to navigate between routes

   // Toggle between User and Authority role
   const handleToggleRole = () => setIsUserLogin(!isUserLogin);

   // Toggle between Login and Register mode
   const handleToggleMode = () => {
      setIsLoginMode(!isLoginMode);
      // Clear inputs when toggling mode
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setAddress('');
      setAadhaar('');
      setError('');
   };

   // Handle Login (Email & Password)
   const handleLogin = async () => {
      try {
         await signInWithEmailAndPassword(auth, email, password);
         
         // Check if the user is an admin (Authority)
         const adminDocRef = doc(db, 'admin', '01ListOfAdmin'); // Adjust the path as necessary
         const adminDoc = await getDoc(adminDocRef);

         if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            const isAdmin = adminData.admins.includes(email);

            if (isUserLogin && isAdmin) {
               setError('This account belongs to an admin. Please select Authority to log in.');
            } else if (!isUserLogin && !isAdmin) {
               setError('This account belongs to a user. Please select User to log in.');
            } else {
               // Navigate based on the role
               navigate(isUserLogin ? "/user/waterflow" : "/admin/setlimit");
            }
         } else {
            console.error("Admin document does not exist.");
            navigate("/user/waterflow"); // Default to User page
         }
      } catch (error) {
         setError(`Login Error: ${error.message}`);
      }
   };

   // Handle Registration (Email & Password)
   const handleRegister = async () => {
      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         const userId = userCredential.user.uid;

         // Create the user document in Firestore
         const userDocRef = doc(db, 'users', email); // Use email as the document ID
         await setDoc(userDocRef, {
            name,
            phone,
            address,
            aadhaar,
         });

         // Create subcollections for the new user (currentMonth, jan24, feb24, etc.)
         const collections = ['currentMonth', 'jan24', 'feb24']; // Add more months if needed
         for (const collection of collections) {
            const servoControlDocRef = doc(db, 'users', email, collection, 'servoControl');
            const waterflowSensorDocRef = doc(db, 'users', email, collection, 'waterflowSensor');
            
            // Initialize servoControl and waterflowSensor documents
            await setDoc(servoControlDocRef, { servoState: 0 }); // Default servo state
            await setDoc(waterflowSensorDocRef, { totalusages: 0 }); // Default total usage
         }

         // Redirect based on the role
         navigate(isUserLogin ? "/user/waterflow" : "/admin/setlimit");
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            setError('This email is already in use. Please use a different email.');
         } else {
            setError(`Registration Error: ${error.message}`);
         }
      }
   };

   // Handle Google Login
   const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;
         
         // Check if the user is an admin (Authority)
         const adminDocRef = doc(db, 'admin', '01ListOfAdmin'); // Adjust the path as necessary
         const adminDoc = await getDoc(adminDocRef);

         if (adminDoc.exists()) {
            const adminData = adminDoc.data();
            const isAdmin = adminData.admins.includes(user.email);

            if (isUserLogin && isAdmin) {
               setError('This account belongs to an admin. Please select Authority to log in.');
            } else if (!isUserLogin && !isAdmin) {
               setError('This account belongs to a user. Please select User to log in.');
            } else {
               // Navigate based on the role
               navigate(isUserLogin ? "/user/waterflow" : "/admin/setlimit");
            }
         } else {
            console.error("Admin document does not exist.");
            navigate("/user/waterflow"); // Default to User page
         }
      } catch (error) {
         setError(`Google Login Error: ${error.message}`);
      }
   };

   return (
      <div className="auth-container">
         <div className="authentic-header">
            <button className={`role-button ${isUserLogin ? 'active' : ''}`} onClick={handleToggleRole}>
               User
            </button>
            <button className={`role-button ${!isUserLogin ? 'active' : ''}`} onClick={handleToggleRole}>
               Authority
            </button>
         </div>
         <div className="auth-card">
            <h1>{isUserLogin ? (isLoginMode ? "User Login" : "User Register") : (isLoginMode ? "Authority Login" : "Authority Register")}</h1>
            {isLoginMode ? (
               <>
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
                  <button onClick={handleLogin} className="auth-button">Login</button>
                  <button onClick={handleGoogleLogin} className="google-button">Sign in with Google</button>
                  <p style={{ color: "white" }}>
                     Don't have an account? <button onClick={handleToggleMode} className="toggle-button">Register</button>
                  </p>
               </>
            ) : (
               <>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="Email"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Name"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                     placeholder="Phone Number"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder="Address"
                     className="auth-input"
                  />
                  <input
                     type="text"
                     value={aadhaar}
                     onChange={(e) => setAadhaar(e.target.value)}
                     placeholder="Aadhaar Number"
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
                  <button onClick={handleRegister} className="auth-button">Register</button>
                  <button onClick={handleGoogleLogin} className="google-button">Sign up with Google</button>
                  <p style={{ color: "white" }}>
                     Already have an account? <button onClick={handleToggleMode} className="toggle-button">Login</button>
                  </p>
               </>
            )}
         </div>
      </div>
   );
};

export default Authentic;
