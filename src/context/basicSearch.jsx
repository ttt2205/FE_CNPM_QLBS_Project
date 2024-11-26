import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'assets/scss/productSearch.scss';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ProductSearch = React.forwardRef(({containerRef},ref) => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // State để xác định màn hình nhỏ
    const navigate = useNavigate();

    // Ref cho cả search container và Bootstrap container
    const searchContainerRef = useRef(null); // Ref cho search-container
 // Ref cho Bootstrap container

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/book?page=1&limit=10000');
                const books = response.data.books;
                setProducts(books);
                setFilteredProducts(books);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // Cập nhật ref dựa trên kích thước màn hình
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width >= 480 && width <= 767); // Xác định điều kiện mobile
        };

        // Lắng nghe sự kiện resize của trình duyệt
        window.addEventListener('resize', handleResize);
        handleResize(); // Gọi ngay khi component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Kiểm tra ref khi component mount
    useEffect(() => {
        console.log("Search container ref:", searchContainerRef.current);
        console.log("Container ref:", containerRef.current);
    }, []);

    // Filter products based on search input
    useEffect(() => {
        filterProducts();
    }, [search]);

    const filterProducts = () => {
        if (search) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase().trim())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    const handleNavigate = () => {
        search ? navigate(`/products?query=${search}`) : navigate("/products");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleNavigate(); // Chuyển hướng khi nhấn Enter
        }
    };

    return (
        <div
            className={`position-relative ${isMobile ? 'product-container' : 'product-search-container'}`} // Thêm điều kiện cho class
            ref={isMobile ? containerRef : searchContainerRef} // Gán ref dựa trên điều kiện
            onMouseLeave={() => setShowSearchPanel(false)} // Hide search panel when mouse leaves
        >
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Trading Card Game"
                    value={search}
                    className="form-control"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => {
                        console.log("Current ref:", isMobile ? containerRef.current : searchContainerRef.current);
                        setShowSearchPanel(true); // Show search panel on click
                    }}
                    onKeyDown={handleKeyDown} // Lắng nghe phím Enter
                />
                <button className="btn btn-danger search-button" onClick={handleNavigate}>
                    <IoIosSearch />
                </button>
            </div>

            {showSearchPanel && (
                <div className="search-panel w-100">
                    {filteredProducts.length > 0 ? (
                        <div className="product-suggestions">
                            {filteredProducts.slice(0, 5).map((product) => (
                                <div key={product.book_id} className="product-item">
                                    <img src={product.image?.url} alt={product.title} className="product-image" />
                                    <span className="product-title">{product.title}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">Không tìm thấy sản phẩm nào</div>
                    )}
                </div>
            )}
        </div>
    );
});

export default ProductSearch;
