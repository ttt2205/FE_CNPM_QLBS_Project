import {
  useLoaderData,
  Link,
  Form,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getPage, getProductById } from "services/productServices";
import ProductPagination from "./Pagination";
import { useEffect, useState } from "react";

export default function ProductPanel() {
  const [data, setData] = useState({
    books: [],
    total_page: 1,
    q: "",
    type: "all",
    page: 1,
    limit: 10,
    sort_type: "asc",
  });
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);
    getPage(data.page, data.limit, {
      q: data.q,
      type: data.type,
      sort_type: data.sort_type,
    }).then((res) => {
      setData({ ...data, ...res });
      setSearching(false);
    });
  }, [data.q, data.type, data.page, data.limit, data.sort_type]);

  return (
    <>
      <div id="search-form" role="search">
        <div className="row">
          <div className="col col-md-2">
            <select
              name="type"
              className="form-select"
              aria-label="label for the select"
              defaultValue={data.type}
              id="type"
              onChange={(e) => {
                setData({ ...data, type: e.target.value });
              }}
            >
              <option value="all">All</option>
              <option value="id">ID</option>
              <option value="title">Title</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
          <div className="col col-md-5">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={data.q}
              onChange={(event) => {
                setData({ ...data, q: event.target.value });
              }}
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </div>
          <select
            id="limit"
            name="limit"
            className="form-select ms-2 col "
            aria-label="label for the select"
            defaultValue={data.limit}
            onChange={(e) => {
              setData({ ...data, limit: e.target.value });
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <select
            id="sort_type"
            name="sort_type"
            className="form-select ms-2 col "
            aria-label="label for the select"
            defaultValue={data.sort_type}
            onChange={(e) => {
              setData({ ...data, sort_type: e.target.value });
            }}
          >
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>

          <Link to="add" className="btn btn-primary text-light col ms-2">
            New
          </Link>
        </div>
      </div>
      <div className="table-responsive-md">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Book ID</th>
              <th scope="col">Title</th>
              <th scope="col">Image</th>
              <th scope="col">Publisher ID</th>
              <th scope="col">Stock Quantity</th>
              <th scope="col">Status ID</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map((book) => (
              <tr key={book.book_id}>
                <th scope="row">{book.book_id}</th>
                <td>{book.title}</td>
                <td>
                  <img src={book.image?.url} alt={book.title} width="100" />
                </td>
                <td>{book.publisher_id}</td>
                <td>{book.stock_quantity}</td>
                <td>{book.status_id}</td>
                <td>
                  <Link
                    to={`edit/${book.book_id}`}
                    className="btn btn-warning text-light"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProductPagination
          page={data.page}
          setPage={(page) => {
            setData({ ...data, page });
          }}
          total_page={data.total_page}
        />
      </div>
    </>
  );
}
