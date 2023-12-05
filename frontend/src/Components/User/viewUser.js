import React, { useState, useEffect } from 'react';

const ViewUser = ({id}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from an API endpoint
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/"+id) // Replace with the correct API endpoint
        const user = await response.json();
        setUserData(user); // Set user data received from the API
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <div>
        {Object.entries(userData).map(([key, value]) => (
          <p>{key}: {value}</p>
        ))}
        
        {/* <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
        <p>Password: {userData.password}</p>
        <p>Phone #: {userData.phone}</p>
        <p>Status: {userData.status}</p>
        <p>User Type: {userData.userType}</p> */}
        {/* Display other user details based on the received user data */}
      </div>
    </div>
  );
};

export default ViewUser;
