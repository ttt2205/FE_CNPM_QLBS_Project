import React from "react";
import { CiStar } from "react-icons/ci";

function ProductInfo({ productInfo }) {
  // Hàm định dạng tiền tệ Việt Nam
  function formatCurrencyVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  return (
    <div className="product-infor-content">
      {/* Tên sản phẩm */}
      <div className="name-product d-inline-flex">
        <h4>{productInfo.title || "N/A"}</h4>
        {productInfo.stock > 0 ? (
          <div className="badge bg-success ms-1 d-flex">
            <span className="align-self-center">Còn hàng</span>
          </div>
        ) : (
          <div className="badge bg-danger ms-1 d-flex">
            <span className="align-self-center">Hết hàng</span>
          </div>
        )}
      </div>

      {/* Nhà cung cấp và tác giả */}
      <div className="suplier-and-author">
        <div className="suplier">
          <p>
            Suplier:{" "}
            <strong>
              {Array.isArray(productInfo.suplier) &&
              productInfo.suplier.length > 0
                ? productInfo.suplier.map((item, index) => (
                    <span key={index}>
                      {index !== productInfo.suplier.length - 1
                        ? `${item}-`
                        : `${item}`}
                    </span>
                  ))
                : "N/A"}
            </strong>
          </p>
        </div>
        <div className="author">
          <p>
            Author:{" "}
            <strong>
              {Array.isArray(productInfo.author) &&
              productInfo.author.length > 0
                ? productInfo.author.map((item, index) => (
                    <span key={index}>
                      {index !== productInfo.author.length - 1
                        ? `${item}-`
                        : `${item}`}
                    </span>
                  ))
                : "N/A"}
            </strong>
          </p>
        </div>
      </div>

      {/* Nhà xuất bản */}
      <div className="publisher">
        <p>
          Publisher: <strong>{productInfo.publisher || "N/A"}</strong>
        </p>
      </div>

      {/* Đánh giá và giảm giá */}
      <div className="vote-and-sale">
        <div className="vote">
          {[...Array(5)].map((_, i) => (
            <CiStar
              key={i}
              className="far fa-star rating-color"
              size={20}
            ></CiStar>
          ))}
        </div>
        <div className="sale">
          <p>|</p>
          <span className="pt-1" style={{ fontSize: "14px" }}>
            (0 lượt đánh giá)
          </span>
        </div>
      </div>

      {/* Giá và giá giảm */}
      <div className="price-and-discount">
        <div className="price-discount">
          <h2>
            {productInfo.discountValue > 0 && productInfo.salePrice
              ? formatCurrencyVND(
                  Math.round(
                    parseFloat(productInfo.salePrice) *
                      (100 - parseFloat(productInfo.discountValue))
                  ) / 100
                )
              : productInfo.salePrice
              ? formatCurrencyVND(Math.round(parseFloat(productInfo.salePrice)))
              : "N/A"}
            &nbsp;
          </h2>
        </div>
        <div className="price-product">
          {productInfo.discountValue > 0 && productInfo.salePrice ? (
            <p id="price">
              {formatCurrencyVND(productInfo.salePrice)}
              &nbsp;
            </p>
          ) : null}
        </div>
        {productInfo.discountValue > 0 ? (
          <div className="discount d-flex align-items-center p-1">
            <p id="discountValue" className="m-0">
              <strong>-{productInfo.discountValue}%</strong>
            </p>
          </div>
        ) : null}
      </div>

      {/* Trạng thái kho hàng */}
      {productInfo.stock > 0 ? (
        <></>
      ) : (
        <div className="out-of-stock">
          <p>Product temporarily out of stock</p>
        </div>
      )}
    </div>
  );
}

// Giá trị mặc định (đề phòng khi productInfo không được truyền hoặc thiếu dữ liệu)
ProductInfo.defaultProps = {
  productInfo: {
    title: "N/A",
    suplier: [],
    author: [],
    publisher: "N/A",
    salePrice: 0,
    discountValue: 0,
    stock: 0,
  },
};

export default ProductInfo;
