import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCity from './createCity';
import ViewCity from './viewCity';
import EditCity from './editCity';
import './city.css';

const CityList = () => {
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCreateCityOpen, setIsCreateCityOpen] = useState(false);
  const [isEditCityOpen, setIsEditCityOpen] = useState(false);

  const handleCreateCity = (city) => {
    setCityList([...cityList, city]);
    setIsCreateCityOpen(false);
  };

  const handleViewCity = (city) => {
    setSelectedCity(city);
  };

  const handleEditCity = (city) => {
    const updatedCityList = cityList.map((c) => (c.id === city.id ? city : c));
    setCityList(updatedCityList);
    setIsEditCityOpen(false);
  };

  const handleDeleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/cities/${id}`);
      const filteredCityList = cityList.filter((city) => city.id !== id);
      setCityList(filteredCityList);
      setSelectedCity(null); // Clear the selected city after deletion
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8000/cities');
      setCityList(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

 return (
    <div className="city-container">
      <button onClick={() => setIsCreateCityOpen(true)}>Create City</button>
      {isCreateCityOpen && <CreateCity onCreateCity={handleCreateCity} />}

      {selectedCity && (
        <ViewCity
          city={selectedCity}
          onClose={() => setSelectedCity(null)}
          onEdit={() => setIsEditCityOpen(true)}
          onDelete={() => handleDeleteCity(selectedCity.id)}
        />
      )}

      {isEditCityOpen && (
        <EditCity
          city={selectedCity}
          onEditCity={handleEditCity}
          onClose={() => setIsEditCityOpen(false)}
        />
      )}

      <ul className="city-list">
        {cityList.map((city) => (
          <li key={city.id}>
            <p>{city.name}  
              <button onClick={() => handleViewCity(city)}>View</button> 
              <button onClick={() => {setSelectedCity(city); setIsEditCityOpen(true);}}>Edit</button> 
              <button onClick={() => handleDeleteCity(city.id)}>Delete</button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;