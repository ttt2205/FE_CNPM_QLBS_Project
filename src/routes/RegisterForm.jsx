import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegisterCustomer } from "services/customerService";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Kiểm tra không để trống các trường
    if (!formData.firstname.trim()) {
      newErrors.firstname = "Tên không được để trống.";
      isValid = false;
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Họ không được để trống.";
      isValid = false;
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Số điện thoại không được để trống.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Số điện thoại phải là số và có đúng 10 chữ số.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống.";
      isValid = false;
    } else if (!/^[\w.%+-]+@gmail\.com$/i.test(formData.email)) {
      newErrors.email = "Email phải có định dạng @gmail.com.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống.";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu và mật khẩu xác nhận không khớp.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi người dùng chỉnh sửa
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const resRegister = await postRegisterCustomer(formData);
      console.log(resRegister);
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 className="text-center">Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="firstname" className="form-label">
            Tên
          </label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && (
            <small className="text-danger">{errors.firstname}</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="lastname" className="form-label">
            Họ
          </label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          {errors.lastname && (
            <small className="text-danger">{errors.lastname}</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="phone_number" className="form-label">
            Số Điện Thoại
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <small className="text-danger">{errors.phone_number}</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Mật Khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="confirmPassword" className="form-label">
            Xác Nhận Mật Khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <small className="text-danger">{errors.confirmPassword}</small>
          )}
        </div>

        <div className="mb-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agree"
            name="agree"
            required
          />
          <label className="form-check-label" htmlFor="agree">
            Tôi đồng ý với các điều khoản và điều kiện
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Đăng Ký
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
