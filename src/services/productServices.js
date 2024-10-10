import axios from "axios";

export async function getPage(page, limit) {
  let response = await axios.get(
    `http://localhost:8080/api/book?page=${page}&limit=${limit}`
  );
  // console.log(response.data.books);
  return { books: response.data.books, total_page: response.data.total_page };
}

export async function getProductById(id) {
  try {
    let response = await axios.get(`http://localhost:8080/api/book?id=${id}`);
    // console.log(response.data.book);
    return response.data.book;
  } catch (e) {
    return e.message;
  }
}
