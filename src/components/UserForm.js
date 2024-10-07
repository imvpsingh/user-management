import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    companyName: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        street: user.address?.street,
        city: user.address?.city,
        companyName: user.company?.name,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      ...formData,
      address: { street: formData.street, city: formData.city },
    };
    onSave(updatedUser);
  };

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            required
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company (Optional)"
          />

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
