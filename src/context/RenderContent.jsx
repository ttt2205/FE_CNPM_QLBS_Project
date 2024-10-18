
import React from "react";
import "assets/scss/homePageUser.scss";
import "assets/scss/shoppingTrend.scss";
/* file này chỉ dùng để render sách ra màn hình */
const RenderContent = ({ books = [] }) => {
    return (
        <div className="row">
            {books.length > 0 ? (
                books.map((book) => (
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-2" key={book.book_id}>
                        <div className="book-item">
                            <div className="image-container">
                                {book.image && book.image.url ? (
                                    <img
                                        src={book.image.url}
                                        alt={book.title}
                                        className="product-img img-fluid"
                                    />
                                ) : (
                                    <p>Ảnh không có sẵn</p>
                                )}
                            </div>
                            <div className="content-container">
                                <p className="book-title">
                                    <b>{book.title}</b>
                                </p>
                                <p className="book-price">
                                    <span className="old-price">
                                        {(
                                            Number(book.price_receipt) +
                                            (Number(book.price_receipt) * Number(book.profit_rate)) +
                                            Number(book.discount?.discount_value || 0)
                                        ).toLocaleString()} đ
                                    </span>
                                    <span className="new-price">
                                        {(
                                            Number(book.price_receipt) +
                                            (Number(book.price_receipt) * Number(book.profit_rate))
                                        ).toLocaleString()} đ
                                    </span>
                                    <span className="discount-rate">
                                        -{book.discount?.discount_value || 0}Đ
                                    </span>
                                </p>
                                <p className="sold-amount">Số lượng {book.stock_quantity}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Chưa có dữ liệu</p>
            )}
        </div>
    );
};

export default RenderContent;
