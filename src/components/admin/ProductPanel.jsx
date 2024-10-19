import {
  useLoaderData,
  Link,
  Form,
  useNavigation,
  redirect,
  useSubmit,
} from "react-router-dom";
import { getPage, getProductById } from "services/productServices";
import ProductPagination from "./ProductPagination";
import { useEffect } from "react";

export async function loader({ request }) {
  let url = new URL(request.url);
  let page = url.searchParams.get("page") || 1;
  let limit = url.searchParams.get("limit") || 1;
  let q = url.searchParams.get("q") || "";
  let type = url.searchParams.get("type") || "all";
  // Fetch data from the API
  let { books, total_page } = await getPage(page, limit, type, q);
  return { books: books || [], total_page: total_page || 1, q, type };
}

// export async function action() {
//   // const contact = await createContact(); //
//   return redirect(`/dashboard/products`);
// }

export default function ProductPanel() {
  const { books, total_page, q, type } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
    document.getElementById("type").value = type;
  }, [q, type]);

  return (
    <>
      {/* <Link to="add" className="btn btn-primary text-light">
        Add Product
      </Link> */}
      <div className="d-flex">
        <Form id="search-form" role="search" className="d-flex">
          <input type="text" hidden name="page" defaultValue={1} />
          <input type="text" hidden name="limit" defaultValue={10} />
          <div className="me-2">
            <select
              name="type"
              className="form-select"
              aria-label="label for the select"
              defaultValue={type}
              id="type"
            >
              <option value="all">All</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publisher">Publisher</option>
            </select>
          </div>
          <div>
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch, // thay the url moi nhat trong lich su thanh duong dan moi
                });
              }}
            />
            <div id="search-spinner" hidden={!searching} aria-hidden />
            <div className="sr-only" aria-live="polite"></div>
          </div>
        </Form>
        <Link to="add" className="btn btn-primary text-light">
          New
        </Link>
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
            {books.map((book) => (
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
        <ProductPagination total_page={total_page} />
      </div>
    </>
  );
}
