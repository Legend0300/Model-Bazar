import React, { useState } from 'react';
import ZoneList from './Components/Zone/zoneList';
import CityList from './Components/City/cityList';
function App() {
  return (
    <div className="App">
      <CityList/>
      <ZoneList/>
      </div>
  );
}
export default App;
