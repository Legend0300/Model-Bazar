import React, { useState } from 'react';
import axios from 'axios';
import './zone.css';

const CreateZone = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    active: false,
    cities: [''],
    zoneManager: '',
  });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (name === 'cities') {
      const newCities = [...formData.cities];
      newCities[index] = value;
      setFormData({ ...formData, cities: newCities });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleAddCity = () => {
    setFormData({ ...formData, cities: [...formData.cities, ''] });
  };

  const handleRemoveCity = (index) => {
    const newCities = [...formData.cities];
    newCities.splice(index, 1);
    setFormData({ ...formData, cities: newCities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post new zone to JSON server
      const response = await axios.post('http://localhost:8000/zones', formData);
      onCreate(response.data);
      setFormData({
        name: '',
        active: false,
        cities: [''],
        zoneManager: '',
      });
      console.log('Zone created successfully!');
    } catch (error) {
      console.error('Error creating zone:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Active:
        <input
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={(e) => handleChange(e)}
          className="form-checkbox"
        />
      </label>

      {formData.cities.map((city, index) => (
        <div key={index}>
          <label className="form-label">
            City {index + 1}:
            <input
              type="text"
              name="cities"
              value={city}
              onChange={(e) => handleChange(e, index)}
              required
              className="form-input"
            />
          </label>
          <button type="button" onClick={() => handleRemoveCity(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddCity}>
        Add City
      </button>

      <label className="form-label">
        Zone Manager:
        <input
          type="text"
          name="zoneManager"
          value={formData.zoneManager}
          onChange={(e) => handleChange(e)}
          required
          className="form-input"
        />
      </label>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default CreateZone;