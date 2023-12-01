import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    userType: 'SuperAdmin'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '' // Clear previous errors when the user starts typing
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation, you can add more complex validation if needed
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm()) {
      // Form data is valid, you can perform further actions (e.g., API request, etc.)
      console.log('Form data:', formData);
      setFormData({
        username: '',
        email: '',
        password: '',
        phone: '',
        userType: 'SuperAdmin'
      });
    } else {
      console.log('Form contains errors. Please correct them.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create User</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-style"
            />
            {errors.username && <p className="text-red-500">{errors.username}</p>}
            <FaCheckCircle className="check-icon ml-2 text-green-500" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-style"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-style"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-style"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="input-style"
          >
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Admin">Admin</option>
            <option value="Zone Manager">Zone Manager</option>
            <option value="Bazar Manager">Bazar Manager</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 transition duration-200 w-full"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;