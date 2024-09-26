import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import '../css/waterflow.css';

const WaterFlow = ({ userId }) => {
  const [totalUsage, setTotalUsage] = useState(0);
  const [penaltyPrice, setPenaltyPrice] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);
  const [regularLimit, setRegularLimit] = useState(100); // Regular limit set to 100 liters
  const [penaltyLimit, setPenaltyLimit] = useState(150); // Penalty limit set to 150 liters
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch water usage
        const waterFlowDocRef = doc(db, 'users', userId, 'currentMonth', 'waterflowSensor');
        const waterFlowDocSnap = await getDoc(waterFlowDocRef);

        if (waterFlowDocSnap.exists()) {
          setTotalUsage(waterFlowDocSnap.data().totalusages || 0);
        }

        // Fetch price info
        const priceDocRef = doc(db, 'admin', 'price');
        const priceDocSnap = await getDoc(priceDocRef);

        if (priceDocSnap.exists()) {
          const data = priceDocSnap.data();
          setPenaltyPrice(data.penaltyPrice || 0);
          setRegularPrice(data.regularPrice || 0);
        }

        // Fetch limits
        const limitDocRef = doc(db, 'admin', 'limit');
        const limitDocSnap = await getDoc(limitDocRef);

        if (limitDocSnap.exists()) {
          const data = limitDocSnap.data();
          setPenaltyLimit(data.penalty || 150);
          setRegularLimit(data.regular || 100);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p className="load">Loading...</p>;

  // Calculate the regular usage and penalty usage
  const regularUsage = Math.min(totalUsage, regularLimit);
  const penaltyUsage = totalUsage > regularLimit ? totalUsage - regularLimit : 0;

  const regularPriceTotal = regularUsage * regularPrice;
  const penaltyPriceTotal = penaltyUsage * penaltyPrice;
  const totalPrice = regularPriceTotal + penaltyPriceTotal;

  return (
    <div className="waterflow-container">
      <header className="waterflow-header">
        <h1>Total Water Usage for Current Month</h1>
      </header>

      <main className="waterflow-main">
        <p><strong>Total Usage (liters):</strong> {totalUsage}</p>
      </main> 

      {/* Regular Price Section */}
      <div className="price-row">
        <div className="price-box regular">
          <h2>Regular Price (₹/L): {regularPrice}</h2>
          <p className="usage-regular"><strong>Price for {regularUsage} liters:</strong> ₹{regularPriceTotal.toFixed(2)}</p>
        </div>
        <div className="price-box penalty">
          <h2>Penalty Price (₹/L): {penaltyPrice}</h2>
          <p className="usage-penalty"><strong>Penalty for {penaltyUsage} liters:</strong> ₹{penaltyPriceTotal.toFixed(2)}</p>
        </div>
      </div>

      {/* Total Price */}
      <div className="total-price">
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
      </div>

      <footer className="waterflow-footer">
        <p>&copy; {new Date().getFullYear()} WaterFlow Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WaterFlow;