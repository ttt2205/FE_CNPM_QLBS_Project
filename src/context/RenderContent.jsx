import React from "react";
import "assets/scss/homePageUser.scss";
import "assets/scss/shoppingTrend.scss";

/* file này chỉ dùng để render sách ra màn hình */
const RenderContent = ({ books = [] }) => {
    const calculatePrices = (price_receipt, profit_rate, discount_value = 0) => {
        const basePrice = Number(price_receipt);
        const profit = basePrice * Number(profit_rate);
        const newPrice = basePrice + profit;
        const discount = Number(discount_value);
        const oldPrice = newPrice + discount;

        return { newPrice, oldPrice };
    };

    return (
        <div className="row">
            {books.length > 0 ? (
                books.map((book) => {
                    const { book_id, title, price_receipt, profit_rate, discount, stock_quantity, image } = book;

                    const { newPrice, oldPrice } = calculatePrices(price_receipt, profit_rate, discount?.discount_value);

                    return (
                        <div className="col-lg-2 col-md-4 col-sm-6 mb-2" key={book_id}>
                            <div className="book-item">
                                {/* Image Section */}
                                <div className="image-container">
                                    {image && image.url ? (
                                        <img
                                            src={image.url}
                                            alt={title}
                                            className="product-img img-fluid"
                                        />
                                    ) : (
                                        <p>Ảnh không có sẵn</p>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="content-container">
                                    <p className="book-title">
                                        <b>{title}</b>
                                    </p>

                                    {/* Price Section */}
                                    <p className="book-price">
                                        <span className="old-price">
                                            {oldPrice.toLocaleString()} đ
                                        </span>
                                        <span className="new-price">
                                            {newPrice.toLocaleString()} đ
                                        </span>
                                        <span className="discount-rate">
                                            -{discount?.discount_value?.toLocaleString() || 0} đ
                                        </span>
                                    </p>

                                    {/* Stock Section */}
                                    <p className="sold-amount">Số lượng {stock_quantity}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>Không tìm thấy sản phẩm nào</p>
            )}
        </div>
    );
};

export default RenderContent;
