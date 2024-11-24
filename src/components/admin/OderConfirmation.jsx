import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getOrders,
  updateConfirm,
} from "../../services/orderConfirmationService";
import { useLoaderData } from "react-router-dom";
import Pagination from "./Pagination";

export async function loader() {
  const ordersData = await getOrders();
  return { ordersData };
}

function OderConfirmation() {
  const { ordersData } = useLoaderData();

  const [orders, setOrders] = useState([]);
  const [ordersToRender, setOrdersToRender] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const totalPages = Math.ceil(orders.length / pagination.itemsPerPage);

  // Function to render table rows
  function renderTable(page) {
    const start = (page - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    const rows = orders.slice(start, end);
    setOrdersToRender(rows);
  }

  useEffect(() => {
    setOrders(ordersData.orders);
    // Gán orderStatus
    ordersData.orders.forEach((order) => {
      setOrderStatus((prevOrderStatus) => ({
        ...prevOrderStatus,
        [order.order_id]: order.status_id,
      }));
    });
  }, [ordersData]);

  useEffect(() => {
    renderTable(pagination.currentPage);
  }, [orders, orderStatus, pagination.currentPage]);

  const handleConfirmOrder = async (orderId, status) => {
    const res = await updateConfirm(orderId, status);
    if (res.error === 0)
      setOrderStatus((prevOrderStatus) => ({
        ...prevOrderStatus,
        [orderId]: 2,
      }));
    console.log(">>> confirm order: ", res.message);
  };

  const handleCancelOrder = async (orderId, status) => {
    const res = await updateConfirm(orderId, status);
    if (res.error === 0)
      setOrderStatus((prevOrderStatus) => ({
        ...prevOrderStatus,
        [orderId]: 5,
      }));
    console.log(">>> cancel order: ", res.message);
  };

  return (
    <>
      <h1>OderConfirmation</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">OderId</th>
            <th scope="col">CustomerId</th>
            <th scope="col">TotalAmount</th>
            <th scope="col">BillPromotionId</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersToRender.map((oder, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{oder.order_id}</td>
                <td>{oder.customer_id}</td>
                <td>{oder.total_amount}</td>
                <td>{oder.billPromotion_id || "Không có"}</td>
                <td>{oder.address}</td>
                <td>
                  {orderStatus[oder.order_id] === 1 ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                          handleConfirmOrder(oder.order_id, "confirm");
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          handleCancelOrder(oder.order_id, "cancel");
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : orderStatus[oder.order_id] === 2 ? (
                    <button type="button" className="btn btn-secondary">
                      Chờ thanh toán
                    </button>
                  ) : orderStatus[oder.order_id] === 3 ? (
                    <button type="button" className="btn btn-secondary">
                      Đã thanh toán
                    </button>
                  ) : orderStatus[oder.order_id] === 4 ? (
                    <button type="button" className="btn btn-secondary">
                      Đã giao hàng
                    </button>
                  ) : (
                    <button type="button" className="btn btn-secondary">
                      Đã hủy
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        page={pagination.currentPage}
        setPage={(page) => {
          setPagination((prev) => {
            return { ...prev, currentPage: page };
          });
        }}
        total_page={totalPages}
      />
    </>
  );
}

export default OderConfirmation;
