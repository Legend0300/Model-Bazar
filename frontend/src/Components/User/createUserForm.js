import React, { useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserShield,
  FaUserCog,
  FaUsers,
  FaUserTie,
  FaUser,
} from "react-icons/fa";

import "./createUserFormStyle.css";
import validateForm from "./validateForm";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    status: "inactive",
    userType: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear previous errors when the user starts typing
    }));
  };

  // const validateForm = () => {
  //   const newErrors = {};

    // Basic validation, you can add more complex validation if needed
  //   if (!formData.username.trim()) {
  //     newErrors.username = "Username is required";
  //   }

  //   if (!formData.email.trim() || !formData.email.includes('.com')) {
  //     newErrors.email = "Email is required";
  //   }

  //   if (!formData.password.trim()) {
  //     newErrors.password = "Password is required";
  //   }

  //   if (!formData.phone.trim()) {
  //     newErrors.phone = "Phone is required";
  //   }

  //   if (!formData.userType.trim()) {
  //     newErrors.userType = "User Type is required";
  //   }
  //   setErrors(newErrors);

  //   // Return true if there are no errors, false otherwise
  //   return Object.keys(newErrors).length === 0;
  // };

  const renderIcon = (fieldName) => {
    if (formData[fieldName] && !errors[fieldName]) {
      return <FaCheckCircle className="check-icon" />;
    }
    return null;
  };

  const createUser = async (user) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (validateForm(formData, setErrors)) {
      // Form data is valid, submit the form)
      createUser(formData);

      // console.log("Form data:", formData);
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        status: "inactive",
        userType: "",
      });
    } else {
      console.log("Form contains errors. Please correct them.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form-title">Create User</h2>

        <div className="input-container">
          <label>Username:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-style"
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
            {renderIcon("username")}
            <FaUser className="username-icon" />{" "}
            {/* Use FaUser for the username icon */}
          </div>
        </div>

        <div className="input-container">
          <label>Email:</label>
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-style"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <FaEnvelope className="email-icon" />
          </div>
        </div>

        <div className="input-container">
          <label>Password:</label>
          <div className="relative flex items-center">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-style"
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            {renderIcon("password")}
            <FaLock className="password-icon" />{" "}
            {/* Use FaLock for the password icon */}
          </div>
        </div>

        <div className="input-container">
          <label>Phone #:</label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-style"
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
            <FaPhone className="phone-icon" />
          </div>
        </div>

        <div className="input-container">
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="select-style"

          >
            <option disabled selected value="">select role</option>
            <option value="SuperAdmin">
              <FaUserShield className="super-admin-icon" /> SuperAdmin
            </option>
            <option value="Admin">
              <FaUserCog  className="admin-icon"/> Admin
            </option>
            <option value="ZoneManager">
              <FaUsers  className="zone-manager-icon"/> Zone Manager
            </option>
            <option value="Supervisor">
              <FaUserTie className="supervisor-icon" /> Supervisor
            </option>
            <option value="BazarManager">
              <FaUser className="bazar-manager-icon"/> Bazar Manager
            </option>
          </select>
        </div>

        <button type="submit" className="button-style">
          Create User
        </button>
      </form>
    </div>
  );
};


export default CreateUserForm;
