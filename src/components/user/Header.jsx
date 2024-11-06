import React, { useState, useRef, useEffect } from 'react';
import banner_header from 'assets/images/banner.webp';
import logo from 'assets/images/fahasa-logo.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/scss/header.scss';
import { FaCartPlus } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { TfiLayoutGrid2 } from "react-icons/tfi";
import { FaChevronDown } from "react-icons/fa";
import ProductSearch from 'context/basicSearch';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [hoveredCategory, setHoveredCategory] = useState('');
    const timeoutRef = useRef(null);
    const dropdownMenuRef = useRef(null);
    const containerRef = useRef(null);
    const hoveredRef = useRef(null);
    const menuCategories = {
        'Danh mục sản phẩm': ['Sản phẩm 1', 'Sản phẩm 2', 'Sản phẩm 3', 'Sản phẩm 4', 'Sản phẩm 5'],
        'FOREIGN BOOKS': ['Book 1', 'Book 2', 'Book 3'],
        'VPP - Dụng Cụ Học Sinh': ['Dụng cụ 1', 'Dụng cụ 2', 'Dụng cụ 3'],
        'Đồ Chơi': ['Đồ chơi 1', 'Đồ chơi 2', 'Đồ chơi 3'],
        'Làm Đẹp - Sức Khỏe': ['Sản phẩm làm đẹp 1', 'Sản phẩm làm đẹp 2'],
        'Hành Trang Đến Trường': ['Hành trang 1', 'Hành trang 2']
    };
    useEffect(() => {
        if (dropdownMenuRef.current && containerRef.current && hoveredRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const dropdownWidth = containerWidth * 0.2;  // Menu chính lấy 20%
            const hoveredCategoryWidth = containerWidth - dropdownWidth; // Phần còn lại
            dropdownMenuRef.current.style.width = `${dropdownWidth}px`;
            hoveredRef.current.style.width = `${hoveredCategoryWidth}px`;
            const dropdownHeight = dropdownMenuRef.current.offsetHeight;
            const hoveredHeight = hoveredRef.current.offsetHeight;
            const maxHeight = Math.max(dropdownHeight, hoveredHeight);  // để cho 2 phần bằng nhau
            dropdownMenuRef.current.style.height = `${maxHeight}px`;
            hoveredRef.current.style.height = `${maxHeight}px`;
        }
    }, [showDropdown]);
    
    
    
    
    const handleMouseEnterMenu = () => {
        clearTimeout(timeoutRef.current);
        setShowDropdown(true);
        setHoveredCategory(Object.keys(menuCategories)[0]);
    };
    const handleMouseLeaveMenu = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
            setHoveredCategory('');
        }, 700);
    };
    const handleMouseEnterCategory = (category) => {
        clearTimeout(timeoutRef.current);
        setHoveredCategory(category);
    };
    return (
        <header className="header">
            {/* Banner - Container-fluid */}
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="col-12 p-0 banner_header">
                        <img src={banner_header} alt="Banner Header" className="img-fluid" />
                    </div>
                </div>
            </div>

            {/* Các phần khác - Container */}
            <div className="container" ref={containerRef}>
                <div className="row align-items-center justify-content-between main-header">
                    <div
                        className="col-auto icon-wrapper position-relative"
                        onMouseEnter={handleMouseEnterMenu}
                        onMouseLeave={handleMouseLeaveMenu}
                        
                    >
                        <a href='/'>
                            <img src={logo} alt="Fahasa Logo" className="logo-img img-fluid" />
                        </a>
                        <TfiLayoutGrid2 className="menu-icon fs-3" />
                        <FaChevronDown className='menu-icon fs-5' />

                        {showDropdown && (
                            <div className="container dropdown-menu-custom position-absolute" ref={dropdownMenuRef}>
                                <ul>
                                    {Object.keys(menuCategories).map((menu, index) => (
                                        <li
                                            key={index}
                                            onMouseEnter={() => handleMouseEnterCategory(menu)}
                                        >
                                            {menu}
                                        </li>
                                    ))}
                                </ul>
                                {hoveredCategory && (
                                    <div className="hovered-category" ref={hoveredRef}>
                                        <div className="row">
                                            {menuCategories[hoveredCategory].map((item, index) => (
                                                <div key={index} className="col-3">
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="col search-box">
                        <ProductSearch containerRef={containerRef}/>
                    </div>

                    <div className="col-auto d-flex align-items-center icon-group">
                        <div className="icon-wrapper">
                            <a href="/cart">
                                <FaCartPlus /> <span>Giỏ Hàng</span>
                            </a>
                        </div>
                        <div className="icon-wrapper">
                            <a href="/profile">
                                <FaCircleUser /> <span>Tài Khoản</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    );
};

export default Header;
