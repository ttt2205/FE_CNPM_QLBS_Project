import { useLoaderData, Link, Form, useNavigation } from "react-router-dom";
import { getPage, getProductById } from "services/productServices";
import ProductPagination from "./ProductPagination";

export async function loader({ request }) {
  let url = new URL(request.url);
  let page = url.searchParams.get("page") || 1;
  let limit = url.searchParams.get("limit") || 1;
  // Fetch data from the API
  let { books, total_page } = await getPage(page, limit);
  return { books: books || [], total_page: total_page || 1 };
}

export default function ProductPanel() {
  const { books, total_page } = useLoaderData();
  const navigation = useNavigation();
  console.log(books);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      {/* <Link to="/admin/product/add" className="btn btn-primary text-light">
        Add Product
      </Link> */}
      <div className="d-flex justify-content-start">
        <Form id="search-form" role="search">
          <input
            id="q"
            className={searching ? "loading" : ""}
            aria-label="Search contacts"
            placeholder="Search"
            type="search"
            name="q"
            // defaultValue={q}
            onChange={(event) => {
              // const isFirstSearch = q == null;
              // submit(event.currentTarget.form, {
              //   replace: !isFirstSearch, // thay the url moi nhat trong lich su thanh duong dan moi
              // });
            }}
          />
          <div id="search-spinner" hidden={!searching} aria-hidden />
          <div className="sr-only" aria-live="polite"></div>
        </Form>
        <Form method="post" className="ms-3">
          <button type="submit" className="btn btn-primary text-light">
            New
          </button>
        </Form>
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
                    to={`/admin/product/edit/${book.book_id}`}
                    className="btn btn-primary text-light"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/admin/product/delete/${book.book_id}`}
                    className="btn btn-danger text-light"
                  >
                    Delete
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
