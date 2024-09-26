import React, { useState, useEffect } from 'react';
import { db } from '../firebase';  // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/viewAnalytics.css';  // Import your CSS for user page styling

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ViewAnalytics = ({ userId }) => {
  const [usageData, setUsageData] = useState({
    currentMonth: null,
    jan24: null,
    feb24: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const currentMonthDocRef = doc(db, 'users', userId, 'currentMonth', 'waterflowSensor');
        const jan24DocRef = doc(db, 'users', userId, 'jan24', 'waterflowSensor');
        const feb24DocRef = doc(db, 'users', userId, 'feb24', 'waterflowSensor');

        const [currentMonthSnap, jan24Snap, feb24Snap] = await Promise.all([
          getDoc(currentMonthDocRef),
          getDoc(jan24DocRef),
          getDoc(feb24DocRef),
        ]);

        setUsageData({
          currentMonth: currentMonthSnap.exists() ? currentMonthSnap.data().totalusages : 0,
          jan24: jan24Snap.exists() ? jan24Snap.data().totalusages : 0,
          feb24: feb24Snap.exists() ? feb24Snap.data().totalusages : 0,
        });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [userId]);

  if (loading) return <p className='load'>Loading...</p>;

  const data = {
    labels: ['Current Month', 'January 2024', 'February 2024'],
    datasets: [
      {
        label: 'Total Water Usage (liters)',
        data: [usageData.currentMonth, usageData.jan24, usageData.feb24],
        fill: false,
        borderColor: '#4CAF50', // Green color for the line
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="view-analytics-container">
      <header className="view-analytics-header">
        <h1>Water Usage Analytics for {userId}</h1>
      </header>
      
      <main className="view-analytics-main">
        <div className="chart-container">
          <Line data={data} />
        </div>
        
        <div className="data-list">
          <ul>
            <li><strong>Current Month:</strong> {usageData.currentMonth !== null ? `${usageData.currentMonth} liters` : 'N/A'}</li>
            <li><strong>January 2024:</strong> {usageData.jan24 !== null ? `${usageData.jan24} liters` : 'N/A'}</li>
            <li><strong>February 2024:</strong> {usageData.feb24 !== null ? `${usageData.feb24} liters` : 'N/A'}</li>
          </ul>
        </div>
      </main>
      
      <footer className="view-analytics-footer">
        <p>&copy; {new Date().getFullYear()} WaterFlow Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ViewAnalytics;