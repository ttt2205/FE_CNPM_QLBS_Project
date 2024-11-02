import axios from "axios";
import { toast } from "react-toastify";

export async function getPage(page, limit, { type, q, sort_type }) {
  try {
    if (!type) type = "all";
    if (!q) q = "";
    if (!sort_type) sort_type = "asc";
    let response = await axios.get(
      `http://localhost:8080/api/book?page=${page}&limit=${limit}&type=${type}&q=${q}&sort_type=${sort_type}`
    );
    // console.log(response.data.books);
    return { books: response.data.books, total_page: response.data.total_page };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return { books: [], total_page: 1 };
  }
}

export async function getProductById(id) {
  let response = await axios.get(`http://localhost:8080/api/book/${id}`);
  // console.log("founded", response.data);
  return response.data.book;
}

export async function updateProduct(id, formData) {
  try {
    let response = await axios.post(
      `http://localhost:8080/api/book/${id}`,
      formData,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
    throw error;
  }
}

export async function getAllReferences() {
  try {
    let response = await axios.get(
      `http://localhost:8080/api/book/reference/all`
    );
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
}

export async function createProduct(formData) {
  try {
    let response = await axios.post(
      `http://localhost:8080/api/book`,
      formData,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
}
