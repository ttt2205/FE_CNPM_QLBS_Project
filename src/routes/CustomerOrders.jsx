import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "context/AuthContext";
import axios from "axios";

const CustomerOrders = () => {
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng được chọn
  const [customerOrders, setCustomerOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  // Dữ liệu mẫu: danh sách đơn hàng của Customer
  // const customerOrders = [
  //   { id: 101, status: "Chờ xác nhận", date: "2024-11-24", total: 250 },
  //   { id: 102, status: "Đã giao", date: "2024-11-22", total: 300 },
  //   { id: 103, status: "Đã hủy", date: "2024-11-21", total: 100 },
  // ];

  // Dữ liệu mẫu: chi tiết sản phẩm của từng đơn hàng
  // const orderDetails = {
  //   101: [
  //     { id: 1, productName: "Laptop", quantity: 1, price: 200 },
  //     { id: 2, productName: "Mouse", quantity: 1, price: 50 },
  //   ],
  //   102: [{ id: 3, productName: "Headphones", quantity: 1, price: 300 }],
  //   103: [{ id: 4, productName: "Notebook", quantity: 2, price: 50 }],
  // };

  // Get data order
  useEffect(() => {
    const getOrder = async () => {
      try {
        if (user && user.email) {
          const resOrder = await axios.get(
            `${process.env.REACT_APP_BACK_END_LOCALHOST}/api/order/order-by-email?email=${user.email}`
          );
          setCustomerOrders(resOrder.data.customer.orders);
          console.log(">>> res order", resOrder);
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

  useEffect(() => {}, [selectedOrder]);

  // Mở modal để xem chi tiết sản phẩm
  const handleShowDetails = (orderId) => {
    setSelectedOrder(orderId);
  };

  const handleCancelOrder = (orderId) => {};

  return (
    <div className="container mt-2">
      <h2 className="mb-4">Đơn hàng của bạn</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {customerOrders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.status_id}</td>
              <td>{order.createdAt}</td>
              <td>${order.total_amount}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleShowDetails(order.order_id)}
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
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails[selectedOrder].map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không tìm thấy chi tiết đơn hàng.</p>
              )}
            </div>
            <div className="modal-footer">
              {selectedOrder &&
                customerOrders.find((order) => order.order_id === selectedOrder)
                  ?.status === "Chờ xác nhận" && (
                  <button
                    className="btn btn-danger"
                    onClick={() => alert("Đơn hàng đã bị hủy.")}
                    data-bs-dismiss="modal"
                  >
                    Hủy đơn
                  </button>
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
};

export default CustomerOrders;
