//support auth api

import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
    // console.log(response);
    return response;
  } catch (error) {
    return error.response.data;
  }
};

export const loginWithToken = async (token) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login/token",
      {
        token,
      }
    );
    return response;
  } catch (error) {
    localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
    return error.response.data;
  }
};
