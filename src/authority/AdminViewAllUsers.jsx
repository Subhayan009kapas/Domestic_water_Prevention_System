import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the path as necessary
import '../css/adminViewAllUser.css'; 

const AdminDashboard = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);

      const allUsersData = [];

      // Iterate through each user document
      querySnapshot.forEach((doc) => {
        allUsersData.push({
          userId: doc.id,
        });
      });

      return allUsersData;
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  // Fetch a specific user's data for a given month
  const fetchUserDataForMonth = async (userId, month) => {
    try {
      const servoControlDocRef = doc(db, 'users', userId, month, 'servoControl');
      const waterFlowDocRef = doc(db, 'users', userId, month, 'waterflowSensor');

      const [servoControlSnap, waterFlowSnap] = await Promise.all([
        getDoc(servoControlDocRef),
        getDoc(waterFlowDocRef),
      ]);

      return {
        servoState: servoControlSnap.exists() ? servoControlSnap.data().servoState : 'No Data',
        totalUsage: waterFlowSnap.exists() ? waterFlowSnap.data().totalusages : 'No Data',
      };
    } catch (error) {
      console.error("Error fetching user's monthly data: ", error);
    }
  };

  // Fetch data for all users
  const fetchAllUsersData = async () => {
    try {
      const allUsers = await fetchAllUsers();

      const allUsersDataWithDetails = await Promise.all(
        allUsers.map(async (user) => {
          const currentMonthData = await fetchUserDataForMonth(user.userId, 'currentMonth');
          const jan24Data = await fetchUserDataForMonth(user.userId, 'jan24');
          const feb24Data = await fetchUserDataForMonth(user.userId, 'feb24');

          return {
            userId: user.userId,
            currentMonth: currentMonthData,
            jan24: jan24Data,
            feb24: feb24Data,
          };
        })
      );

      setAllUsersData(allUsersDataWithDetails);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all users' data: ", error);
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllUsersData();
  }, []);

  if (loading) return <p className='load'>Loading...</p>;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1>All Users Data</h1>
      </header>
      
      <main className="admin-dashboard-main">
        <table className="admin-dashboard-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Current Month Usage (liters)</th>
              <th>January 2024 Usage (liters)</th>
              <th>February 2024 Usage (liters)</th>
              <th>Current Servo State</th>
              <th>Due Bill</th>
            </tr>
          </thead>
          <tbody>
            {allUsersData.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.currentMonth.totalUsage}</td>
                <td>{user.jan24.totalUsage}</td>
                <td>{user.feb24.totalUsage}</td>
                <td>{user.currentMonth.servoState === true ? 'On' : 'Off'}</td>
                <td>{user.currentMonth.totalUsage }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      
      <footer className="admin-dashboard-footer">
        <p>&copy; {new Date().getFullYear()} WaterFlow Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;