import React from "react";

function DetailProductInfo({ detailProductInfo }) {
  // tách chuỗi thành các từ in hoa
  const formatProductCode = (text) => {
    return text
      .split(/(?=[A-Z])/) // Tách chuỗi tại các ký tự in hoa
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa từ
      .join(" "); // Ghép các từ với dấu cách
  };

  return (
    <div className="detail-product-info-content">
      <div className="title">
        <strong>Thông tin chi tiết</strong>
      </div>
      <table className="general-info">
        {Object.keys(detailProductInfo).map((key) => {
          if (detailProductInfo[key]) {
            return (
              <tr>
                <th id={key} className="lable-info">
                  {formatProductCode(key)}
                </th>
                <td className="data">{detailProductInfo[key]}</td>
              </tr>
            );
          }
          return <></>;
        })}
        {/* <tr>
          <th className="lable-info">Product code</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Supplier</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Author</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Publisher</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Publisher Year</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Weight</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Size</th>
          <td className="data">asdasd</td>
        </tr>
        <tr>
          <th className="lable-info">Quantity of Page</th>
          <td className="data">asdasd</td>
        </tr> */}
      </table>
    </div>
  );
}

export default DetailProductInfo;
