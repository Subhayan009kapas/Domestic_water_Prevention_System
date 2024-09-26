// export default ServoControl;

import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Adjust the path as necessary
import { doc, getDoc, setDoc } from 'firebase/firestore';
import '../css/servoControl.css';  // Import your CSS for user page styling

const ServoControl = ({ userId = "defaultUserId" }) => {
  const [servoState, setServoState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalUsage, setTotalUsage] = useState(0); // Track total water usage
  const [maxLimit, setMaxLimit] = useState(200); // Assuming default max limit
  const [penaltyLimit, setPenaltyLimit] = useState(150);
  const [regularLimit, setRegularLimit] = useState(100);

  const servoControlDocRef = userId ? doc(db, 'users', userId, 'currentMonth', 'servoControl') : null;
  const waterFlowDocRef = userId ? doc(db, 'users', userId, 'currentMonth', 'waterflowSensor') : null;
  const limitDocRef = doc(db, 'admin', 'limit'); // Assuming limit is stored in admin collection

  useEffect(() => {
    if (!userId) {
      console.error("userId is undefined or null.");
      return;
    }

    const fetchServoState = async () => {
      try {
        const docSnap = await getDoc(servoControlDocRef);
        if (docSnap.exists()) {
          setServoState(docSnap.data().servoState);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    const fetchWaterUsage = async () => {
      try {
        const docSnap = await getDoc(waterFlowDocRef);
        if (docSnap.exists()) {
          setTotalUsage(docSnap.data().totalusages || 0); // Assuming total usage is stored here
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    const fetchLimits = async () => {
      try {
        const docSnap = await getDoc(limitDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMaxLimit(data.max || 200);
          setPenaltyLimit(data.penalty || 150);
          setRegularLimit(data.regular || 100);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching limits: ", error);
      }
    };

    fetchServoState();
    fetchWaterUsage();
    fetchLimits();
    setLoading(false);
  }, [userId]);

  const handleToggle = async () => {
    const newState = !servoState;
    try {
      await setDoc(servoControlDocRef, { servoState: newState });
      setServoState(newState);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Determine the bar color based on the total usage
  const getBarColor = () => {
    if (totalUsage < regularLimit) return '#90EE90';
    if (totalUsage >= regularLimit && totalUsage < maxLimit) return '#ffa756';
    return 'red';
  };

  if (loading) return <p className='load'>Loading...</p>;

  return (
    <div className="servo-control-container">
      <header className="servo-control-header">
        <h1>Gate Control</h1>{userId}
      </header>
      
      <main className="servo-control-main">
        <p><strong>Current Gate Status:</strong> {servoState !== null ? (servoState ? 'On' : 'Off') : 'N/A'}</p>
        
        <div className="servo-control-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={servoState}
              onChange={handleToggle}
              disabled={totalUsage >= maxLimit} // Disable switch if usage exceeds the max limit
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Progress Bar */}
        <div className="usage-bar" style={{ backgroundColor: getBarColor() }}>
          Usage: {totalUsage} liters
        </div>
      </main>
      
      <footer className="servo-control-footer">
        <p>&copy; {new Date().getFullYear()} WaterFlow Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServoControl;
