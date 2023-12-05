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

  useEffect(() => {
    axios
      .get("http://localhost:8000/zones")
      .then((response) => setZones(response.data))
      .catch((error) => console.error("Error fetching zones:", error));
  }, []);

  const handleCreate = (newZone) => {
    const id = uuidv4();
    const zoneWithId = { ...newZone, id };

    axios
      .post("http://localhost:8000/zones", zoneWithId)
      .then((response) => {
        setZones([...zones, response.data]);
        setSelectedZone(response.data);
        setMode("view");
      })
      .catch((error) => console.error("Error creating zone:", error));
  };

  const handleView = (zone) => {
    setSelectedZone(zone);
    setMode("view");
  };

  const handleEdit = (zone) => {
    setSelectedZone(zone);
    setMode("edit");
  };

  const handleDelete = (zone) => {
    axios
      .delete(`http://localhost:8000/zones/${zone.id}`)
      .then(() => setZones(zones.filter((z) => z.id !== zone.id)))
      .catch((error) => console.error("Error deleting zone:", error));
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
      {mode === "view" && selectedZone && <ViewZone zoneData={selectedZone} />}
      {mode === "edit" && selectedZone && (
        <EditZone initialData={selectedZone} />
      )}
      {mode === "create" && <CreateZone onCreate={handleCreate} />}
    </div>
  );
};

export default ZoneList;
