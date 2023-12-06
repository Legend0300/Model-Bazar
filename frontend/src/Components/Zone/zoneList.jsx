import React, { useState, useEffect } from "react";
import axios from "axios";
import EditZone from "./editZone";
import ViewZone from "./viewZone";
import CreateZone from "./createZone";
import "./zone.css";
import { v4 as uuidv4 } from "uuid";

const ZoneList = () => {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [mode, setMode] = useState("view");
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const response = await axios.get("http://localhost:8000/zones");
      setZones(response.data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/cities");
      setCityList(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCreate = async (newZone, onCreateSuccess) => {
    const id = uuidv4();
    const zoneWithId = { ...newZone, id };

    try {
      await axios.post("http://localhost:8000/zones", zoneWithId);
      console.log('Zone created successfully!');
      onCreateSuccess(); // Close the CreateZone form
      fetchZones(); // Refresh the zone list
    } catch (error) {
      console.error("Error creating zone:", error);
    }
  };

  const handleView = async (zone) => {
    if (selectedZone === zone) {
      setSelectedZone(null); // Hide details if the same zone is clicked
    } else {
      setSelectedZone(zone);
    }
    setMode("view");
  };

  const handleEdit = async (zone) => {
    try {
      await fetchCities(); // Fetch the latest list of cities
      setSelectedZone(zone);
      setMode("edit");
    } catch (error) {
      console.error("Error fetching cities for editing:", error);
    }
  };

  const handleDelete = async (zone) => {
    try {
      await axios.delete(`http://localhost:8000/zones/${zone.id}`);
      console.log('Zone deleted successfully!');
      setZones(zones.filter((z) => z.id !== zone.id));
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

  const handleUpdateSuccess = async () => {
    try {
      await fetchZones(); // Fetch the latest list of zones
      console.log('Zone updated successfully!');
    } catch (error) {
      console.error("Error fetching updated zones:", error);
    }
    
    // Additional logic after updating the zone, e.g., close the form and reset mode
    setSelectedZone(null);
    setMode("view");
  };

  return (
    <div className="zone-list-container">
      <h1 className="title">Zone List</h1>
      {zones.map((zone) => (
        <div key={zone.id} className="zone-item">
          <h2 className="zone-name">{zone.name}</h2>
          <button onClick={() => handleView(zone)} className="view-button">
            View
          </button>
          <button onClick={() => handleEdit(zone)} className="edit-button">
            Edit
          </button>
          <button onClick={() => handleDelete(zone)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
      <button onClick={() => setMode("create")} className="create-button">
        Create Zone
      </button>
      {mode === "view" && selectedZone && (
        <ViewZone zoneData={selectedZone} onDeleteSuccess={fetchZones} />
      )}
      {mode === "edit" && selectedZone && (
        <EditZone
          initialData={selectedZone}
          onUpdateSuccess={handleUpdateSuccess}
          cityList={cityList} // Pass the latest city list to EditZone
        />
      )}
      {mode === "create" && (
        <CreateZone
          onCreate={(newZone, onCreateSuccess) =>
            handleCreate(newZone, onCreateSuccess)
          }
        />
      )}
    </div>
  );
};

export default ZoneList;