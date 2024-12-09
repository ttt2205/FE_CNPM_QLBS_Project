import React, { useEffect, useState } from "react";
import Header from "components/user/Header";
import Footer from "components/user/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import axios from "axios";

import { getDiscountValueLatest } from "../utils/GetValueMethos";

const Home = () => {
  const { user } = useAuth();
  const navgate = useNavigate();
  const [books, setBooks] = useState([]);

  // Cập nhật lại cart trong localStorage
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/cart/books"
        );
        setBooks(response.data.resBooks);
      } catch (error) {
        console.error(
          "khong the lay books de cap nhat cart trong Home.jsx",
          error
        );
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let newCart = [];

      if (cart.length > 0) {
        // Bien dem so phan tu trong cart
        let countItemCart = cart.length;
        let countToChange = 0;
        // Loc qua cac phan tu trong books
        const productIdCart = cart.map((item) => item.productID);
        console.log("productIdCart", productIdCart);
        console.log("books", books);
        for (let i = 0; i < books.length; i++) {
          if (productIdCart.includes(books[i].book_id + "")) {
            console.log(
              "books[i].status.name1",
              books[i].book_id,
              books[i].status.status_name
            );
            // Nếu sách có trong giỏ hàng
            if (books[i].status.status_name === "Đang bán") {
              const bestDiscount = getDiscountValueLatest(books[i].discounts);
              const bestDiscountId = bestDiscount?.discountId ?? 0;
              const bestDiscountValue = bestDiscount?.value ?? 0;
              let itemFound = cart.find(
                (item) => item.productID === books[i].book_id + ""
              );
              itemFound = {
                ...itemFound,
                ["title"]: books[i].title,
                ["salePrice"]: books[i].sale_price,
                ["discountId"]: bestDiscountId,
                ["discountValue"]: bestDiscountValue,
                ["total"]:
                  (itemFound.quantity *
                    (books[i].sale_price * (100 - bestDiscountValue))) /
                  100,
              };
              console.log("itemFound", itemFound);
              newCart.push(itemFound);
            } else {
            }
            countToChange++; // Cập nhật biến đếm
          }

          // Nếu đã kiểm tra hết các phần tử trong cart
          if (countItemCart === countToChange) {
            console.log("Đã kiểm tra hết các sản phẩm trong giỏ hàng.");
            break;
          }
        }
        // nếu có thay đổi cập nhật lại cart
        if (newCart.length > 0) {
          console.log("da cap nhat");
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(newCart));
        } else {
          localStorage.removeItem("cart");
        }
      }
    }
  }, [books]);

  return (
    <>
      {user?.role?.role_name === "Admin" ? (
        navgate("/dashboard")
      ) : (
        <div className="page-wrapper m-auto">
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
