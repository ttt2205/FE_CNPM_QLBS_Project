// import React, { useState, useEffect } from "react";

import PaginationComponent from "context/pagination";
import RenderContent from "context/RenderContent";
import "assets/scss/homePageUser.scss";
import "assets/scss/shoppingTrend.scss";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import { useFetchBooks } from "config/useFetchBook";
const ShoppingTrends = () => {
    const { books, currentPage, totalPages, setCurrentPage } = useFetchBooks(1, 12);
    console.log(books[0].genre);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Container>
                <Row className="">
                    <Col>
                        <Breadcrumb className="custom-breadcrumb">
                            <Breadcrumb.Item href="/">TRANG CHỦ</Breadcrumb.Item>
                            <Breadcrumb.Item active>XU HƯỚNG MUA SẮM</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>

                {/* Shopping Trend Header */}
                <Row className="container">
                    <Col className="d-flex align-items-center trend-header">
                        <FaArrowTrendUp size={30} />
                        <h4 className="m-1 fw-b p-2">XU HƯỚNG MUA SẮM</h4>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        {/* <Nav variant="tabs" defaultActiveKey="all">
                        <Nav.Item>
                                <Nav.Link as={Link} to="/">Tất cả</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Văn học</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Tâm lý - Kỹ năng sống</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/">Manga - Comic</Nav.Link>
                            </Nav.Item>
                        </Nav> */}
                        <div className="">
                            <Button>Tất cả</Button>
                            <Button>Văn học</Button>
                            <Button>Tâm lí-Kĩ năng sống</Button>
                            <Button>Sách giáo khoa</Button>
                        </div>
                    </Col>
                </Row>

                {/* Render the Content (Books) */}
                <Row className="mt-4">
                    <RenderContent books={books} />
                </Row>

                {/* Pagination */}
                <div className="d-flex justify-content-center mt-4">
                    <PaginationComponent
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </Container>
        </>
    );
};

export default ShoppingTrends;
