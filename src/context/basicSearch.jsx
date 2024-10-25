// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import 'assets/scss/productSearch.scss';
// import { IoIosSearch } from 'react-icons/io';
// import { useNavigate } from 'react-router-dom';

// const ProductSearch = () => {
//     const [search, setSearch] = useState('');
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [showSearchPanel, setShowSearchPanel] = useState(false);
//     const navigate = useNavigate();

//     const searchContainerRef = useRef(null); // Reference to the entire search container
//     const [searchQuery, setSearchQuery] = useState('');
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery) {
//       // Chuyển hướng sang trang advanced search kèm theo từ khóa tìm kiếm
//       navigate(`/products?query=${searchQuery}`);
//     }
//   };
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/book?page=1&limit=10000');
//                 const books = response.data.books;
//                 setProducts(books);
//                 setFilteredProducts(books);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//         fetchProducts();
//     }, []);

//     // Filter products based on search input
//     useEffect(() => {
//         filterProducts();
//     }, [search]);

//     const filterProducts = () => {
//         if (search) {
//             const filtered = products.filter(product =>
//                 product.title.toLowerCase().includes(search.toLowerCase().trim())
//             );
//             setFilteredProducts(filtered);
//         } else {
//             setFilteredProducts(products);
//         }
//     };

//     const handleNavigate = () => {
//         navigate("/products");
//     };

//     return (
//         <div 
//             className="product-search-container position-relative" 
//             ref={searchContainerRef}
//             onMouseLeave={() => setShowSearchPanel(false)} // Hide search panel when mouse leaves
//         >
//             <div className="input-group" onSubmit={handleSearch}>
//                 <input
//                     type="text"
//                     placeholder="Trading Card Game"
//                     value={search}
//                     className="form-control"
//                     onChange={(e) => setSearch(e.target.value)}
//                     onClick={() => setShowSearchPanel(true)} // Show search panel on click
//                 />
//                 <button className="btn btn-danger search-button" onClick={handleNavigate} >
//                     <IoIosSearch />
//                 </button>
//             </div>

//             {showSearchPanel && (
//                 <div className="search-panel w-100">
//                     {filteredProducts.length > 0 ? (
//                         <div className="product-suggestions">
//                             {filteredProducts.slice(0, 5).map((product) => (
//                                 <div key={product.book_id} className="product-item">
//                                     <img src={product.image?.url} alt={product.title} className="product-image" />
//                                     <span className="product-title">{product.title}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="no-results">Không tìm thấy sản phẩm nào</div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductSearch;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'assets/scss/productSearch.scss';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const ProductSearch = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const navigate = useNavigate();

    const searchContainerRef = useRef(null); // Reference to the entire search container

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
            className="product-search-container position-relative"
            ref={searchContainerRef}
            onMouseLeave={() => setShowSearchPanel(false)} // Hide search panel when mouse leaves
        >
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Trading Card Game"
                    value={search}
                    className="form-control"
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={() => setShowSearchPanel(true)} // Show search panel on click
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
};

export default ProductSearch;
