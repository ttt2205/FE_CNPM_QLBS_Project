import { useLoaderData, useNavigate } from "react-router-dom";
import { getReceiptById } from "services/purchaseServices";

export async function loader({ params }) {
  let id = params.receiptId;
  let { receipt } = await getReceiptById(id);
  return { receipt: receipt || {}, id };
}

const ChiTietPhieuNhap = () => {
  const { receipt, id } = useLoaderData();
  const navigate = useNavigate();
  /*
  {
                   "details": [
      {
        "book_id": 1,
        "title": "The Great Adventure",
        "detail": {
          "quantity": 10,
          "price": "50000.00"
        }
      },
      {
        "book_id": 3,
        "title": "Faker! What was that????",
        "detail": {
          "quantity": 10,
          "price": "100000.00"
        }
      }
    ],
*/
  return (
    <>
      <h1>Chi tiết phiếu nhập</h1>
      <div>Mã phiếu nhập: {id}</div>
      <div className="">Nhà cung cấp: {receipt.provider?.name}</div>
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
          {receipt.details.map((detail) => (
            <tr key={detail.book_id}>
              <td>{detail.book_id}</td>
              <td>{detail.title}</td>
              <td>{detail.detail?.quantity}</td>
              <td>
                {new Intl.NumberFormat("en-US").format(
                  detail.detail?.price || 0
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Tổng cộng</td>
            <td>
              {new Intl.NumberFormat("en-US").format(
                receipt.details.reduce(
                  (total, detail) =>
                    total +
                    (detail.detail?.quantity || 0) * detail.detail?.price,
                  0
                )
              )}
            </td>
          </tr>
        </tfoot>
      </table>
      <button onClick={(e) => navigate(-1)}>Cancel</button>
    </>
  );
};

export default ChiTietPhieuNhap;
