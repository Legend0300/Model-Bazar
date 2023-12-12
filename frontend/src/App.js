import React, { useState } from 'react';
import ZoneList from './Components/Zone/zoneList';
import CityList from './Components/City/cityList';
import UserList from './Components/User/userList';
import CreateUserForm from './Components/User/createUserForm';
function App() {
  return (
    <div className="App">
      {/* <CreateUserForm/> */}
      <UserList/>
      {/* <CityList/> */}
      {/* <ZoneList/> */}
      </div>
  );
}
export default App;
