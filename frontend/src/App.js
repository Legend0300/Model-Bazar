import React, { useState } from 'react';
import ZoneList from './Components/Zone/zoneList';
import CityList from './Components/City/cityList';
import UserList from './Components/User/userList';
function App() {
  return (
    <div className="App">
      {/* <CityList/>
      <ZoneList/> */}
      <UserList/>
      </div>
  );
}
export default App;
