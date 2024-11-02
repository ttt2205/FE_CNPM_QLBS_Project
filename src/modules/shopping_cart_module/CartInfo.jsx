import React from "react";

function CartInfo({ quantityProductChosen }) {
  return (
    <div className="cart-info-content row">
      {/* product-of-cart-info-container */}
      <div className="col-lg-8 col-sm-12 product-of-cart-info-container">
        <div className="product-of-cart-info-content">
          {/* header cart item */}
          <div className="header-cart-item-container rounded-1">
            <div className="header-cart-item-content d-flex align-items-center rounded-1">
              <div className="header-cart-item row w-100">
                <div className="col-1 d-flex justify-content-center align-items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    style={{
                      width: "15px",
                      height: "15px",
                      transform: "scale(1.5)", // Tăng kích thước nếu muốn
                    }}
                  />
                </div>
                <p className="col-6 p-0 m-0 ">
                  Chọn tất cả ({quantityProductChosen} sản phẩm)
                </p>
                <p className="col-2 text-center p-0 m-0 ">Số lượng</p>
                <p className="col-2 text-center p-0 m-0 ">Thành tiền</p>
                <div className="col-1 p-0 m-0"></div>
              </div>
            </div>
          </div>
          {/* product-cart-items */}
          <div className="product-cart-container-left rounded-1">
            {/* Nội dung của sản phẩm hoặc thông tin khác */}
            <div className="product-cart-content-left d-flex flex-column align-items-center rounded-1">
              <div className="product-cart-item row w-100">
                <div className="col-1 d-flex justify-content-center align-items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    style={{
                      width: "15px",
                      height: "15px",
                      transform: "scale(1.5)", // Tăng kích thước nếu muốn
                    }}
                  />
                </div>
                <div className="col-6 p-0 m-0 d-flex align-items-center">
                  <div className="product-item d-flex flex-row w-100 h-100 bg-primary row">
                    <div className="col-4">
                      <img src="" alt="" />
                      asad
                    </div>
                    <div className="item-info col-8">vnbsd</div>
                  </div>
                </div>
                <div className="col-2 text-center p-0 m-0 d-flex align-items-center">
                  Số lượng
                </div>
                <p className="col-2 text-center p-0 m-0 d-flex align-items-center">
                  Thành tiền
                </p>
                <div className="col-1 p-0 m-0 d-flex align-items-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* total-amount */}
      <div className="col-lg-4 hidden-max-width-992px d-none d-lg-block total-right-container">
        ajkhsakd
      </div>
    </div>
  );
}

export default CartInfo;
