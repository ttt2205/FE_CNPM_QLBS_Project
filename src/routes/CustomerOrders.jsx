// export default CustomerOrders;
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "context/AuthContext";
import { updateConfirm } from "services/orderConfirmationService";
import { getDiscountBook } from "services/customerService";
import axios from "axios";

const CustomerOrders = () => {
  const { user, isLoading } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng được chọn
  const [customerOrders, setCustomerOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [discountBook, setDiscountBook] = useState([]);

  // Dữ liệu mẫu: danh sách đơn hàng của Customer
  // const customerOrders = [
  //   { id: 101, status: "Chờ xác nhận", date: "2024-11-24", total: 250, promotionName: "name", promotionType: "Truc tiep", promotionValue: "10000" },
  //   { id: 102, status: "Đã giao", date: "2024-11-22", total: 300, promotionName: "name", promotionType: "Truc tiep", promotionValue: "10000" },
  //   { id: 103, status: "Đã hủy", date: "2024-11-21", total: 100, promotionName: "name", promotionType: "Phan tram", promotionValue: "20" },
  // ];

  // Dữ liệu mẫu: chi tiết sản phẩm của từng đơn hàng
  // const orderDetails = {
  //   101: [
  //     { id: 1, productName: "Laptop", quantity: 1, price: 200, thanhTien: quantity * price, discountId: 0, salePrice: 0, isMainUrl: "linkanh" },
  //     { id: 2, productName: "Mouse", quantity: 1, price: 50, thanhTien: quantity * price, discountId: 0, salePrice: 0, isMainUrl: "linkanh" },
  //   ],
  //   102: [{ id: 3, productName: "Headphones", quantity: 1, price: 300, thanhTien: quantity * price, discountId: 0, salePrice: 0, isMainUrl: "linkanh"  }],
  // };

  // Dữ liệu mẫu: danh sách discounts
  // const discounts = [
  //   { discountId: "", discountName: "", discountValue: "" },
  // ];

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0"); // Đảm bảo 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format currency VND
  function formatCurrencyVND(number) {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  // Get discount book
  useEffect(() => {
    const getDiscount = async () => {
      try {
        const resDiscount = await getDiscountBook();
        // Format lại discount book
        const discountBookFormat = resDiscount.data.resDiscount.map(
          (discount) => {
            return {
              discountId: discount.discount_id,
              discountName: discount.name,
              discountValue: discount.percent_value,
            };
          }
        );
        setDiscountBook(discountBookFormat);
      } catch (error) {
        console.log(
          ">>> Khong the lay discount book trong CustomerOrder.jsx",
          "\nError",
          error
        );
      }
    };
    getDiscount();
  }, []);

  // Get data order
  useEffect(() => {
    const getOrder = async () => {
      try {
        if (user && user.email) {
          const resOrder = async () => {
            return await axios.get(
              `${process.env.REACT_APP_BACK_END_LOCALHOST}/api/order/order-by-email?email=${user.email}`
            );
          };
          const res = await resOrder();
          console.log("res.data", res.data);
          if (res.data.error === 0) {
            let { orders } = res.data.customer;
            orders = orders.sort((a, b) => b.order_id - a.order_id); // Sắp xếp theo id giảm dần
            // Tính tổng số lượng các sản phẩm trùng lặp
            orders = orders.map((order) => {
              const arr = order.batches;
              // Lọc các phần tử trùng lăp
              let uniqueArr = arr.filter((item, index) => {
                let foundIndex = arr.findIndex(
                  (t) => t.book_id === item.book_id
                );
                return foundIndex === index;
              });
              // Tính tổng quantity của từng sản phẩm trùng lặp
              uniqueArr = uniqueArr.map((item) => {
                const quantity = arr.reduce((total, t) => {
                  if (t.book_id === item.book_id) {
                    total += t.orderdetails.quantity;
                  }
                  return total;
                }, 0);
                return {
                  ...item,
                  orderdetails: {
                    ...item.orderdetails,
                    quantity,
                  },
                };
              });
              order.batches = uniqueArr;
              return order;
            });

            // Get data customerOrder
            const newOrders = orders.map((item) => ({
              id: item.order_id,
              status: item.orderstatus.status_name,
              date: formatDate(new Date(item.createdAt)), // Chuyển đổi ngày
              total: item.total_amount,
              promotionName: item.billpromotion?.name ?? "NOT",
              promotionType: item.billpromotion?.type ?? "",
              promotionValue: item.billpromotion?.value ?? "0",
            }));
            setCustomerOrders([...newOrders]); // Cập nhật state một lần

            // Get data orderDetails
            const newOrderDetail = {};
            orders.forEach((item) => {
              newOrderDetail[item.order_id] = item.batches.map((batche) => ({
                id: batche.book_id,
                productName: batche.book.title,
                quantity: batche.orderdetails.quantity,
                price: batche.orderdetails.final_price,
                thanhTien:
                  batche.orderdetails.quantity *
                  batche.orderdetails.final_price,
                salePrice: batche.book.sale_price,
                discountId: batche.orderdetails.discount_id,
                isMainUrl: batche.book.image.url,
              }));
            });
            setOrderDetails(newOrderDetail);
          }
        }
      } catch (error) {
        console.log(
          ">>> Khong the lay order cua khach hang trong CustomerOrder.jsx",
          "\nError",
          error
        );
      }
    };
    getOrder();
  }, [user]);

  // refresh lai trang web khi co du lieu
  useEffect(() => {
    // console.log("discountBook", discountBook);
  }, [selectedOrder, discountBook]);

  // Mở modal để xem chi tiết sản phẩm
  const handleShowDetails = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleCancelOrder = async (orderId) => {
    await updateConfirm(orderId, "cancel");
    setCustomerOrders((prev) =>
      prev.map(
        (item) =>
          item.id === orderId
            ? { ...item, status: "Đã hủy" } // Tạo bản sao của item và cập nhật `status`
            : item // Giữ nguyên các phần tử khác
      )
    );
  };

  const handleConfirmReceivedTheGoods = async (orderId) => {
    await updateConfirm(orderId, "received");
    setCustomerOrders((prev) =>
      prev.map(
        (item) =>
          item.id === orderId
            ? { ...item, status: "Đã thanh toán" } // Tạo bản sao của item và cập nhật `status`
            : item // Giữ nguyên các phần tử khác
      )
    );
  };

  if (!isLoading) {
    return (
      <div className="container mt-2">
        <h2 className="mb-4">Đơn hàng của bạn</h2>
        {customerOrders.length === 0 ? (
          <h6>Hiện tại không có đơn hàng nào</h6>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền đã giảm</th>
                <th>Promotion Name</th>
                <th>Promotion Value</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <p
                      className={
                        order.status === "Chờ xác nhận"
                          ? "text-warning"
                          : order.status === "Đã thanh toán"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {order.status}
                    </p>
                  </td>
                  <td>{order.date}</td>
                  <td>{formatCurrencyVND(order.total)}</td>
                  <td>{order.promotionName}</td>
                  <td>
                    {order.promotionType === "Phan tram"
                      ? `${order.promotionValue}%`
                      : order.promotionType === "Truc tiep"
                      ? `${formatCurrencyVND(order.promotionValue)}`
                      : order.promotionValue}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleShowDetails(order.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#orderDetailModal"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal chi tiết sản phẩm */}
        <div
          className="modal fade"
          id="orderDetailModal"
          tabIndex="-1"
          aria-labelledby="orderDetailModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="orderDetailModalLabel">
                  Chi tiết đơn hàng #{selectedOrder}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {selectedOrder && orderDetails[selectedOrder] ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tên sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Giá đã giảm</th>
                        <th>Thành tiền</th>
                        {/* <th>Discount Name</th>
                        <th>Discount Value</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails[selectedOrder].map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div>{item.productName}</div>
                          </td>
                          <td>
                            <a
                              href={`/detail-product/${item.id}/${item.productName}`}
                              style={{
                                display: "block",
                                width: "60px",
                                height: "60px",
                                backgroundImage: `url('${process.env.REACT_APP_BACK_END_LOCALHOST}/img/${item.isMainUrl}')`,
                                backgroundSize: "cover",
                              }}
                            ></a>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrencyVND(item.salePrice)}</td>
                          <td>
                            <div className="d-flex">
                              {formatCurrencyVND(item.price)}
                              {discountBook.find(
                                (discount) =>
                                  item.discountId === discount.discountId
                              ) ? (
                                <div
                                  className="d-flex bg-danger text-white rounded-2 align-items-center"
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  <p id="discountValue" className="m-0">
                                    <strong>
                                      -
                                      {discountBook.find(
                                        (discount) =>
                                          item.discountId ===
                                          discount.discountId
                                      )?.discountValue || 0}
                                      %
                                    </strong>
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </td>
                          <td>{formatCurrencyVND(item.thanhTien)}</td>
                          {/* <td>
                            {discountBook.find(
                              (discount) =>
                                item.discountId === discount.discountId
                            )?.discountName || ""}
                          </td>
                          <td>
                            {discountBook.find(
                              (discount) =>
                                item.discountId === discount.discountId
                            )?.discountValue || 0}
                            %
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Không tìm thấy chi tiết đơn hàng.</p>
                )}
              </div>
              <div className="w-100" style={{}}>
                <div
                  className="d-flex"
                  style={{ width: "90%", margin: "auto" }}
                >
                  <h4 className="text-danger">Tổng Tiền Chưa Giảm:&nbsp;</h4>
                  <h4>
                    {selectedOrder && orderDetails[selectedOrder]
                      ? formatCurrencyVND(
                          orderDetails[selectedOrder].reduce(
                            (total, detail) => {
                              total += detail.thanhTien;
                              return total;
                            },
                            0
                          )
                        )
                      : 0}
                  </h4>
                </div>
              </div>
              <div className="modal-footer">
                {selectedOrder &&
                customerOrders.find((order) => order.id === selectedOrder)
                  ?.status === "Chờ xác nhận" ? (
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleCancelOrder(selectedOrder);
                    }}
                  >
                    Hủy đơn
                  </button>
                ) : (
                  customerOrders.find((order) => order.id === selectedOrder)
                    ?.status === "Chờ thanh toán" && (
                    <button
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        handleConfirmReceivedTheGoods(selectedOrder);
                      }}
                    >
                      Đã nhận được hàng
                    </button>
                  )
                )}
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="d-flex justify-content-center align-items-center mt-2"
          style={{ height: "100vh;" }}
        >
          <div className="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }
};

export default CustomerOrders;
