import React, { useState } from 'react';
import axios from 'axios';
import './zone.css';

const EditZone = ({ initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData.name,
    active: initialData.active,
    city: initialData.city,
    zoneManager: initialData.zoneManager,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update zone data on the JSON server
      await axios.put(`http://localhost:8000/zones/${initialData.id}`, formData);
      console.log('Zone updated successfully!');
    } catch (error) {
      console.error('Error updating zone:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Active:
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Zone Manager:
        <input
          type="text"
          name="zoneManager"
          value={formData.zoneManager}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Update Zone</button>
    </form>
  );
};

export default EditZone;
