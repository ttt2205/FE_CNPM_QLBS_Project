// export default DetailProductInfo;
import React from "react";

function DetailProductInfo({ detailProductInfo }) {
  // Hàm loại bỏ các trường không cần thiết
  const excludedFields = [
    "image",
    "receipts",
    "stock",
    "alt_images",
    "status_id",
    "language_id",
    "publisher_id",
    "genre_id",
    "cover_format_id",
  ];
  const formatProductCode = (text) => {
    return text
      .split(/(?=[A-Z])/) // Tách chuỗi tại các ký tự in hoa
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa từ
      .join(" "); // Ghép các từ với dấu cách
  };

  // Tạo các dòng bảng từ các thuộc tính của sản phẩm
  const renderProductDetails = (product) => {
    return Object.entries(product)
      .filter(([key]) => !excludedFields.includes(key)) // Loại bỏ các trường không cần thiết
      .map(([key, value], index) => (
        <tr key={index}>
          <th className="label-info">{formatProductCode(key)}</th>
          <td className="data">
            {!Array.isArray(value)
              ? value // Trả về giá trị nếu không phải object hoặc array
              : value.map(
                  (item, index) =>
                    // <span key={index}>
                    index !== value.length - 1 ? `${item}-` : `${item}`
                  // </span>
                ) || ""}
          </td>
        </tr>
      ));
  };

  return (
    <div className="detail-product-info-content">
      <div className="title">
        <strong>Thông tin chi tiết</strong>
      </div>
      <table className="general-info">
        {/* Render các chi tiết sản phẩm */}
        {renderProductDetails(detailProductInfo)}
      </table>
    </div>
  );
}

export default DetailProductInfo;
