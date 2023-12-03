import React, { useState, useEffect } from 'react';
import ViewUser from './viewUser';
import EditUserForm from './editUserform';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch user data from an API endpoint
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/") // Replace with the correct API endpoint
        const userList = await response.json();
        setUsers(userList); // Set user data received from the API
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Update the user list after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for editing
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone #</th>
            <th>Status</th>
            <th>User Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>{user.userType}</td>
              <td>
                <button className='deleteButton' onClick={() => deleteUser(user.id)}>Delete</button>
                <button className='editButton' onClick={() => handleEdit(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <EditUserForm user={selectedUser} />}
    </div>
  );
};

export default UserList;
