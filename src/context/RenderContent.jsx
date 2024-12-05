import React, { useEffect } from "react";
import "assets/scss/homePageUser.scss";
import "assets/scss/shoppingTrend.scss";
import { useNavigate } from "react-router-dom";
const RenderContent = ({ books = [] }) => {
    const navigate = useNavigate();
    const calculatePrices = (sale_price, discounts = []) => {
        let discount = discounts.sort((a, b) => b.percent_value - a.percent_value)[0];
        let percent = discount ? discount.percent_value : 0;
        let final_price = sale_price - (sale_price * percent) / 100;
        return { percent_value: percent, final_price: parseInt(final_price) };
    };
    const handleNavigate = (book_id, title) => {
        navigate(`/detail-product/${book_id}/${title}`);
    };

    return (
        <div className="row">
            {books.length > 0 ? (
                books.map((book) => {
                    const { book_id, title, sale_price, discounts, stock_quantity, image } = book;

                    const { percent_value, final_price } = calculatePrices(sale_price, discounts);

                    return (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={book_id} onClick={() => handleNavigate(book_id, title)}>
                            <div className="book-item">
                                {/* Image Section */}
                                <div className="image-container">
                                    {/* Discount Badge */}
                                    {percent_value > 0 && (
                                        <div className="discount-rate">
                                            -{percent_value}%
                                        </div>
                                    )}


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
                                        {/* Conditionally render old price */}
                                        {percent_value > 0 && (
                                            <span className="old-price">
                                                {sale_price.toLocaleString()} đ
                                            </span>
                                        )}
                                        <span className="new-price">
                                            {final_price.toLocaleString()} đ
                                        </span>
                                    </p>

                                    {/* Stock Section */}
                                    <p className="sold-amount">
                                        {stock_quantity && stock_quantity > 0 ? (
                                            <span className="text-success">Số lượng: {stock_quantity}</span>
                                        ) : (
                                            <span className="text-danger">Hết hàng</span>
                                        )}
                                    </p>
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
