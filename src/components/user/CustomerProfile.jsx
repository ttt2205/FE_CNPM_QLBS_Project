import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import {
  getCustomerInfoByEmail,
  updateCustomerInfo,
} from "services/customerService";
import { Link } from "react-router-dom";

function CustomerProfile() {
  const auth = useAuth();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const response = await getCustomerInfoByEmail(
          auth.user.email,
          auth.token
        );
        const { firstName, lastName, email, phone_number } =
          response.data.customer;
        setUser({
          firstname: firstName,
          lastname: lastName,
          email: email,
          phoneNumber: phone_number,
        });
        setFormData({
          firstname: firstName,
          lastname: lastName,
          email: email,
          phoneNumber: phone_number,
        });
      } catch (error) {
        console.error("Error fetching customer info:", error);
      }
    };
    fetchCustomerInfo();
  }, [auth]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "Vui lòng không để trống.";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Vui lòng không để trống.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng không để trống.";
    } else if (!/^[\w.%+-]+@gmail\.com$/i.test(formData.email)) {
      newErrors.email = "Email phải có dạng @gmail.com.";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Vui lòng không để trống.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Số điện thoại phải là số và có đúng 10 kí tự.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng sửa lại
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      await updateCustomerInfo(formData, auth.token);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating customer info:", error);
    }
  };

  const handleCancelClick = () => {
    setFormData(user);
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4>User Profile</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.firstname && (
                <small className="text-danger">{errors.firstname}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.lastname && (
                <small className="text-danger">{errors.lastname}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {errors.phoneNumber && (
                <small className="text-danger">{errors.phoneNumber}</small>
              )}
            </div>
          </form>
        </div>
        <div className="card-footer">
          {!isEditing ? (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
          ) : (
            <>
              <button
                className="btn btn-success me-2"
                onClick={handleSaveClick}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      {auth.user && auth.user.role.role_name === "Admin" && (
        <Link to="/dashboard" className="btn btn-primary mt-3">
          Go to Admin Dashboard
        </Link>
      )}
    </div>
  );
}

export default CustomerProfile;
