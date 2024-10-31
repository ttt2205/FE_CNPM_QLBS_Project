import React, { useState, useCallback } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import ChooseQuantity from "./ChooseQuantity";

function DeliveryInfo() {
  const [count, setCount] = useState(1);

  const handleQuantityChange = useCallback((type) => {
    setCount((quantity) => {
      if (type === "increment") return quantity + 1;
      if (type === "decrement") return quantity > 1 ? quantity - 1 : 1;
      return quantity;
    });
  }, []);

  return (
    <div className="delivery-infor-content">
      <div className="deliver-title">
        <strong>Thông tin vận chuyển</strong>
      </div>
      <div className="delivery-address">
        <div className="address">
          <p>
            Delivery to: <strong>Hồ Chí Minh</strong>
          </p>
        </div>
        <div className="change-address">
          <div className="btn-change-address">change</div>
        </div>
      </div>
      <div id="expect_delivery_detail" className="expect-delivery-detail">
        <div className="icon-delivery">
          <TbTruckDelivery></TbTruckDelivery>
        </div>
        <div className="expect-time-delivery">
          <div className="name-delivery">
            <strong>Standard Delivery</strong>
          </div>
          <div className="time-delivery">
            <span>
              Expect delivery: <strong>Monday - 10 - 28</strong>
            </span>
          </div>
        </div>
      </div>
      <div id="quantity" className="quantity-to-buy">
        <div className="titile-quantity">
          <h4>Quantity:</h4>
        </div>
        <div className="btn-chose-quantity">
          <ChooseQuantity count={count} handleQuantity={handleQuantityChange} />
        </div>
      </div>
    </div>
  );
}

export default DeliveryInfo;
