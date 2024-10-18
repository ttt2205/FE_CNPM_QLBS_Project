import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function ProductPagination({ total_page }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const limit = parseInt(query.get("limit")) || 1;
  const page = parseInt(query.get("page")) || 1;

  const totalPages = total_page; // Tổng số trang, dung API trả về
  const maxPages = 5; // Số trang tối đa hiển thị
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const navs = pages.map((value) => (
    <li className={`page-item ${value === page ? "active" : ""}`} key={value}>
      <Link
        className="page-link"
        to={`/dashboard/products?page=${value}&limit=${limit}`}
      >
        {value}
      </Link>
    </li>
  ));

  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`/dashboard/products?page=${prevPage}&limit=${limit}`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {navs}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`/dashboard/products?page=${nextPage}&limit=${limit}`}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
