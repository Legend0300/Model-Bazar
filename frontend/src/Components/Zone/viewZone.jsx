import React from 'react';
import axios from 'axios';
import './zone.css';

const ViewZone = ({ zoneData }) => {
  const handleDelete = async () => {
    try {
      // Delete the zone from the JSON server
      await axios.delete(`http://localhost:8000/zones/${zoneData.id}`);
      console.log('Zone deleted successfully!');
    } catch (error) {
      console.error('Error deleting zone:', error);
    }
  };

  return (
    <div className="view-zone-container">
      <h1 className="title">Zone Details</h1>
      <p><strong>Name:</strong> {zoneData.name}</p>
      <p><strong>Active:</strong> {zoneData.active ? 'Yes' : 'No'}</p>
      <p><strong>City:</strong> {zoneData.city}</p>
      <p><strong>Zone Manager:</strong> {zoneData.zoneManager}</p>
      <button onClick={handleDelete}>Delete Zone</button>
    </div>
  );
};

export default ViewZone;
