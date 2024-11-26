import React, { useEffect } from "react";
import "assets/scss/homePageUser.scss";
import "assets/scss/shoppingTrend.scss";
import { useNavigate } from "react-router-dom";
const RenderContent = ({ books = [] }) => {
    const navigate = useNavigate();
    const calculatePrices = (sale_price, discounts = []) => {
        const newPrice = parseInt(sale_price);
        const percent_value = discounts.length > 0
            ? Math.max(...discounts.map(discount => discount.percent_value))
            : 0;
        const oldPrice = Math.round((newPrice + percent_value / 100 * newPrice));
        return { percent_value, newPrice, oldPrice };
    };
    const handleNavigate = (book_id, title) => {
        navigate(`/detail-product/${book_id}/${title}`);
      };
      
    return (
        <div className="row">
            {books.length > 0 ? (
                books.map((book) => {
                    const { book_id, title, sale_price, discounts, stock_quantity, image } = book;

                    const { percent_value, newPrice, oldPrice } = calculatePrices(sale_price, discounts);

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
                                        {oldPrice > newPrice && (
                                            <span className="old-price">
                                                {oldPrice.toLocaleString()} đ
                                            </span>
                                        )}
                                        <span className="new-price">
                                            {newPrice.toLocaleString()} đ
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
// import React, { useState } from "react";
// import PaginationComponent from "context/pagination";
// import RenderContent from "context/RenderContent";
// import "assets/scss/homePageUser.scss";
// import "assets/scss/shoppingTrend.scss";
// import { FaArrowTrendUp } from "react-icons/fa6";
// import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
// import { useFetchBooks } from "config/useFetchBook";

// const ShoppingTrends = () => {
//     const { books, currentPage, totalPages, setCurrentPage } = useFetchBooks(1, 12);
//     const [selectedGenre, setSelectedGenre] = useState("all"); // State to track the selected genre

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Function to filter books by selected genre
//     const filterBooksByGenre = () => {
//         if (selectedGenre === "all") {
//             return books; // Return all books if no genre is selected
//         }
//         return books.filter((book) => book.genre.name === selectedGenre);
//     };

//     // Handle button clicks to set the selected genre
//     const handleGenreClick = (genre) => {
//         setSelectedGenre(genre);
//     };

//     // Filtered books based on the selected genre
//     const filteredBooks = filterBooksByGenre();

//     return (
//         <>
//             <Container>
//                 <Row className="">
//                     <Col>
//                         <Breadcrumb className="custom-breadcrumb">
//                             <Breadcrumb.Item href="/">TRANG CHỦ</Breadcrumb.Item>
//                             <Breadcrumb.Item active>XU HƯỚNG MUA SẮM</Breadcrumb.Item>
//                         </Breadcrumb>
//                     </Col>
//                 </Row>

//                 {/* Shopping Trend Header */}
//                 <Row className="container">
//                     <Col className="d-flex align-items-center trend-header">
//                         <FaArrowTrendUp size={30} />
//                         <h4 className="m-1 fw-b p-2">XU HƯỚNG MUA SẮM</h4>
//                     </Col>
//                 </Row>

//                 {/* Genre Buttons */}
//                 <Row className="mt-3">
//                     <Col>
//                         <div className="">
//                             <Button onClick={() => handleGenreClick("all")}>Tất cả</Button>
//                             <Button onClick={() => handleGenreClick("Văn học")}>Văn học</Button>
//                             <Button onClick={() => handleGenreClick("Tâm lý - Kỹ năng sống")}>Tâm lý - Kỹ năng sống</Button>
//                             <Button onClick={() => handleGenreClick("Sách giáo khoa")}>Sách giáo khoa</Button>
//                         </div>
//                     </Col>
//                 </Row>

//                 {/* Render the Content (Filtered Books) */}
//                 <Row className="mt-4">
//                     <RenderContent books={filteredBooks} />
//                 </Row>

//                 {/* Pagination */}
//                 <div className="d-flex justify-content-center mt-4">
//                     <PaginationComponent
//                         totalPages={totalPages}
//                         currentPage={currentPage}
//                         handlePageChange={handlePageChange}
//                     />
//                 </div>
//             </Container>
//         </>
//     );
// };

// export default ShoppingTrends;
