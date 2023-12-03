import React, { useState } from 'react';
import CreateUserForm from './Components/User/createUserForm';
import UserList from './Components/User/userList';
import ViewUser from './Components/User/viewUser';
import EditUserForm from './Components/User/editUserform';
function App() {
  return (
    <div className="App">
    <CreateUserForm/>

    {/* <ViewUser id={1}/> */}
    {/* <UserList/> */}
    </div>
  );
}
export default App;
