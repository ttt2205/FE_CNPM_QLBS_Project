// import React, { useState, useRef, useEffect } from 'react';
// import banner_header from 'assets/images/banner.webp';
// import logo from 'assets/images/fahasa-logo.webp';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'assets/scss/header.scss';
// import { FaCartPlus } from 'react-icons/fa';
// import { FaCircleUser } from 'react-icons/fa6';
// import { TfiLayoutGrid2 } from "react-icons/tfi";
// import { FaChevronDown } from "react-icons/fa";
// import ProductSearch from 'context/basicSearch';
// import { useNavigate } from 'react-router-dom';

// import axios from 'axios';
// const Header = () => {
//     const navigate = useNavigate();
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [hoveredCategory, setHoveredCategory] = useState('');
//     const timeoutRef = useRef(null);
//     const dropdownMenuRef = useRef(null);
//     const containerRef = useRef(null);
//     const hoveredRef = useRef(null);
//     const [categories, setCategories] = useState([]); // Lưu các thể loại sách
//     const [subCategories, setSubCategories] = useState({});
//     useEffect(() => {
//         if (dropdownMenuRef.current && containerRef.current && hoveredRef.current) {
//             // const containerWidth = containerRef.current.offsetWidth;
//             // const dropdownWidth = containerWidth * 0.2;  // Menu chính lấy 20%
//             // const hoveredCategoryWidth = containerWidth - dropdownWidth; // Phần còn lại

//             // dropdownMenuRef.current.style.width = `${dropdownWidth}px`;
//             // hoveredRef.current.style.width = `${hoveredCategoryWidth}px`;

//             // Lấy chiều cao của hai phần
//             // const dropdownHeight = dropdownMenuRef.current.offsetHeight;
//             // const hoveredHeight = hoveredRef.current.offsetHeight;
//             // const maxHeight = Math.max(dropdownHeight, hoveredHeight);  // Để cho 2 phần bằng nhau

//             // // Áp dụng chiều cao tối đa cho cả hai phần
//             // dropdownMenuRef.current.style.height = `${maxHeight}px`;
//             // hoveredRef.current.style.height = `${maxHeight}px`;
//         }
//     }, [showDropdown, hoveredCategory]);

//     const handleCategoryClick = (categoryName) => {
//         navigate(`/products?category=${categoryName}`);
//     };
//     useEffect(() => {
//         // Fetch dữ liệu thể loại sách từ API
//         const fetchCategoriesAndProducts = async () => {
//             try {
//                 const categoriesResponse = await axios.get('http://localhost:8080/api/book/genres');
//                 const { mainCategories, subCategories } = categoriesResponse.data.data;
//                 console.log("danh mục chính", mainCategories);
//                 console.log("danh mục phụ", subCategories);
//                 setCategories(mainCategories);
//                 const subCategoriesByParent = subCategories.reduce((acc, subCategory) => {
//                     const parentId = subCategory.parent_id;
//                     if (!acc[parentId]) acc[parentId] = [];
//                     acc[parentId].push(subCategory);
//                     return acc;
//                 }, {});

//                 setSubCategories(subCategoriesByParent);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategoriesAndProducts();
//     }, []);

//     const handleMouseEnterMenu = () => {
//         clearTimeout(timeoutRef.current);
//         setShowDropdown(true);
//         if (!hoveredCategory && categories.length > 0) {
//             setHoveredCategory(categories[0].genre_id);
//         }
//     };
//     const handleMouseLeaveMenu = () => {
//         timeoutRef.current = setTimeout(() => {
//             setShowDropdown(false);
//             setHoveredCategory('');
//         }, 700);
//     };

//     const handleMouseEnterCategory = (category) => {
//         clearTimeout(timeoutRef.current);
//         setHoveredCategory(category);
//         console.log("Hovered category:", category);
//     };
//     return (
//         <header className="header">
//             {/* Banner - Container-fluid */}
//             <div className="container-fluid p-0">
//                 <div className="row m-0">
//                     <div className="col-12 p-0 banner_header">
//                         <img src={banner_header} alt="Banner Header" className="img-fluid" />
//                     </div>
//                 </div>
//             </div>

//             {/* Các phần khác - Container */}
//             <div className="container" ref={containerRef}>
//                 <div className="row align-items-center justify-content-between main-header">
//                     <div
//                         className="col-auto icon-wrapper position-relative"
//                         onMouseLeave={handleMouseLeaveMenu}

//                     >
//                         <a href='/'>
//                             <img src={logo} alt="Fahasa Logo" className="logo-img img-fluid" />
//                         </a>

//                         <TfiLayoutGrid2 className="menu-icon fs-3" onMouseEnter={handleMouseEnterMenu} />
//                         <FaChevronDown className='menu-icon fs-5' onMouseEnter={handleMouseEnterMenu} />

//                         {showDropdown && (
//                             <div className="container dropdown-menu-custom position-absolute" ref={dropdownMenuRef} onMouseLeave={handleMouseLeaveMenu}>
//                                 <ul>
//                                     {categories.map((category) => (
//                                         <li
//                                             key={category.genre_id}
//                                             onMouseEnter={() => handleMouseEnterCategory(category.genre_id)}
//                                             onClick={() => handleCategoryClick(category.name)}
//                                             onMouseLeave={handleMouseLeaveMenu}
//                                         >
//                                             {category.name}
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 {/* Hovered category - danh mục con */}
//                                 {hoveredCategory && (
//                                     <div className="hovered-category" ref={hoveredRef} onMouseLeave={handleMouseLeaveMenu}>
//                                             <ul>
//                                                 {subCategories[hoveredCategory]?.map((subCategory) => (
//                                                     <li
//                                                         key={subCategory.genre_id}
//                                                         onClick={() => handleCategoryClick(subCategory.name)}
//                                                         style={{ cursor: "pointer", marginRight: "10px" }}
//                                                         onMouseLeave={handleMouseLeaveMenu}
//                                                     >
//                                                         {subCategory.name}
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                     </div>
//                                 )}

//                             </div>
//                         )}

//                     </div>

//                     <div className="col search-box">
//                         <ProductSearch containerRef={containerRef} />
//                     </div>

//                     <div className="col-auto d-flex align-items-center icon-group">
//                         <div className="icon-wrapper">
//                             <a href="/cart">
//                                 <FaCartPlus /> <span>Giỏ Hàng</span>
//                             </a>
//                         </div>
//                         <div className="icon-wrapper">
//                             <a href="/profile">
//                                 <FaCircleUser /> <span>Tài Khoản</span>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </header>

//     );
// };

// export default Header;
import React, { useState, useRef, useEffect } from "react";
import banner_header from "assets/images/banner.webp";
import logo from "assets/images/fahasa-logo.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/header.scss";
import { FaCartPlus } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import ProductSearch from "context/basicSearch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

import axios from "axios";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const dropdownMenuRef = useRef(null);
  const hoveredRef = useRef(null);
  const containerRef = useRef(null);
  const [categories, setCategories] = useState([]); // Lưu các thể loại sách
  const [subCategories, setSubCategories] = useState({});

  useEffect(() => {
    // Fetch dữ liệu thể loại sách từ API
    const fetchCategoriesAndProducts = async () => {
      try {
        const categoriesResponse = await axios.get(
          "http://localhost:8080/api/book/reference/genres"
        );
        const { mainCategories, subCategories } = categoriesResponse.data.data;
        setCategories(mainCategories);
        const subCategoriesByParent = subCategories.reduce(
          (acc, subCategory) => {
            const parentId = subCategory.parent_id;
            if (!acc[parentId]) acc[parentId] = [];
            acc[parentId].push(subCategory);
            return acc;
          },
          {}
        );

        setSubCategories(subCategoriesByParent);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);

  // Chỉ đóng dropdown khi chuột rời cả hai khu vực (dropdown menu và hovered category)
  const handleMouseLeaveBothAreas = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
      setHoveredCategory("");
    }, 500);
  };

  const handleMouseEnterMenu = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
    if (!hoveredCategory && categories.length > 0) {
      setHoveredCategory(categories[0].genre_id);
    }
  };

  const handleMouseEnterCategory = (category) => {
    setHoveredCategory(category);
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <header className="header">
      {/* Banner - Container-fluid */}
      <div className="container-fluid p-0">
        <div className="row m-0">
          <div className="col-12 p-0 banner_header">
            <img
              src={banner_header}
              alt="Banner Header"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Các phần khác - Container */}
      <div className="container" ref={containerRef}>
        <div className="row align-items-center justify-content-between main-header">
          <div className="col-auto icon-wrapper position-relative">
            <a href="/">
              <img
                src={logo}
                alt="Fahasa Logo"
                className="logo-img img-fluid"
              />
            </a>

            <TfiLayoutGrid2
              className="menu-icon fs-3"
              onMouseEnter={handleMouseEnterMenu}
            />
            <FaChevronDown
              className="menu-icon fs-5"
              onMouseEnter={handleMouseEnterMenu}
            />

            {showDropdown && (
              <div
                className="container dropdown-menu-custom position-absolute"
                ref={dropdownMenuRef}
                onMouseLeave={(e) => {
                  // Nếu rời khỏi cả dropdown và hovered category thì đóng menu
                  if (!hoveredRef.current.contains(e.relatedTarget)) {
                    handleMouseLeaveBothAreas();
                  }
                }}
              >
                <ul>
                  {categories.map((category) => (
                    <li
                      key={category.genre_id}
                      onMouseEnter={() =>
                        handleMouseEnterCategory(category.genre_id)
                      }
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>

                {/* Hovered category - danh mục con */}
                {hoveredCategory && (
                  <div
                    className="hovered-category"
                    ref={hoveredRef}
                    onMouseLeave={(e) => {
                      // Nếu rời khỏi cả hovered category và dropdown thì đóng menu
                      if (!dropdownMenuRef.current.contains(e.relatedTarget)) {
                        handleMouseLeaveBothAreas();
                      }
                    }}
                  >
                    <ul>
                      {subCategories[hoveredCategory]?.map((subCategory) => (
                        <li
                          key={subCategory.genre_id}
                          onClick={() => handleCategoryClick(subCategory.name)}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                        >
                          {subCategory.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col search-box">
            <ProductSearch containerRef={containerRef} />
          </div>

          <div className="col-auto d-flex align-items-center icon-group">
            {/* Cart */}
            <div className="icon-wrapper">
              <a href="/cart">
                <FaCartPlus /> <span></span>
              </a>
            </div>
            {/* Status order */}
            {auth.customer ? (
              <div className="icon-wrapper">
                <a href="/order-status">
                  <TbTruckDelivery />
                </a>
              </div>
            ) : null}
            {/* Account */}
            <div className="icon-wrapper">
              {auth.customer ? (
                <a href="/profile">
                  <FaCircleUser /> <span></span>
                </a>
              ) : (
                <a href="/user-login">
                  <FaCircleUser /> <span></span>
                </a>
              )}
            </div>
            {/* Logout */}
            {auth.customer ? (
              <div className="icon-wrapper">
                <a
                  onClick={() => {
                    auth.logOutCustomer();
                  }}
                >
                  <FiLogOut />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
