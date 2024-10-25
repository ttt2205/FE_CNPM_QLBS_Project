import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderContent from './RenderContent';
import PaginationComponent from './pagination';
import { useSearchParams, useLocation } from 'react-router-dom';
import 'assets/scss/advancedSearch.scss';
const AdvancedSearch = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category'); // Get category from URL query
  const query = searchParams.get('query');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [categories, setCategories] = useState([]); // Main categories
  const [childCategories, setChildCategories] = useState([]); // Subcategories
  const [selectedSupplier, setSelectedSupplier] = useState(''); // Language
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || null); // tự động chọn category từ URL
  const [selectedChildCategories, setSelectedChildCategories] = useState([]);
  
  // Fetch categories and products from API
  useEffect(() => {
    const fetchCategoriesAndProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/book?page=1&limit=10000'),
          axios.get('http://localhost:8080/api/book/genres'),
        ]);

        const books = productsResponse.data.books;
        const { mainCategories, subCategories } = categoriesResponse.data.data;

        setProducts(books);
        setFilteredProducts(books);
        setCategories(mainCategories); // Set main categories
        setChildCategories(subCategories); // Set subcategories
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoriesAndProducts();
  }, []);
useEffect(() => {
    if (categoryFromUrl) {
      const mainCategory = categories.find(cat => cat.name === categoryFromUrl);
      const subCategory = childCategories.find(subCat => subCat.name === categoryFromUrl);
  
      if (mainCategory) {
        setSelectedCategory(mainCategory.name);
        setSelectedChildCategories([]); 
      } else if (subCategory) {
        const parentCategory = categories.find(cat => cat.genre_id === subCategory.parent_id);
        if (parentCategory) {
          setSelectedCategory(parentCategory.name); 
          setSelectedChildCategories([subCategory.name]); 
        }
      }
    }
  }, [categoryFromUrl, categories, childCategories]);
  useEffect(() => {
    if (selectedCategory) {
      filterProducts();
    }
    filterProducts();
  }, [selectedCategory, products]);
  useEffect(() => {
    filterProducts(); // Lọc lại sản phẩm khi `query` thay đổi
}, [query]);
  const handleCategoryChange = (genreName) => {
    setSelectedCategory(genreName);
    setSelectedChildCategories([]); 
  };
  const handleChildCategoryChange = (genreName) => {
    setSelectedChildCategories(prevState =>
      prevState.includes(genreName)
        ? prevState.filter(name => name !== genreName) 
        : [...prevState, genreName] 
    );
  };
  const filterProducts = () => {
    let filtered = products;
    if (query) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase().trim())
      );
    }
    if (selectedCategory) {
      const selectedMainCategory = categories.find(cat => cat.name === selectedCategory);
      if (selectedMainCategory) {
        const mainCategoryId = selectedMainCategory.genre_id;
        filtered = filtered.filter(product =>
          product.genre_id === mainCategoryId ||
          product.genre.parent_id === mainCategoryId
        );
      }
    }
    if (selectedChildCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedChildCategories.includes(product.genre.name)
      );
    }
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const productPrice = product.price_receipt + product.price_receipt * product.profit_rate;
        return productPrice >= min && (!max || productPrice <= max);
      });
    }
    if (selectedSupplier) {  //tìm theo ngôn ngữ
      filtered = filtered.filter(product => product.language.language_name === selectedSupplier);
    }

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    filterProducts();
  }, [search, selectedCategory, selectedChildCategories, priceRange, selectedSupplier]);
  //pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="product-search-container container">
        <div className="sidebar mt-3">
          <h4 className="fw-b">Lọc theo</h4>

          {/* Main categories */}
          <h5>Danh mục chính</h5>
          <ul className="categories-list">
            {categories.map((category, index) => (
              <li key={`${category.name}-${index}`}>
                <label>
                  <input
                    type="radio"
                    name="mainCategory"
                    checked={selectedCategory === category.name}
                    onChange={() => handleCategoryChange(category.name)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
          </ul>

          {/* Subcategories */}
          {selectedCategory && childCategories.length > 0 && (
            <>
              <h5>Danh mục phụ</h5>
              <ul className="categories-list">
                {childCategories
                  .filter(category => category.parent_id === categories.find(cat => cat.name === selectedCategory)?.genre_id)
                  .map((category, index) => (
                    <li key={`${category.name}-${index}`}>
                      <label>
                        <input
                          type="checkbox"
                          name={`childCategory-${category.name}`}
                          checked={selectedChildCategories.includes(category.name)}
                          onChange={() => handleChildCategoryChange(category.name)}
                        />
                        {category.name}
                      </label>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {/* Price range */}
          <h4>Giá</h4>
          <ul className="price-range-list">
            {['0-150000', '150000-300000', '300000-500000', '500000-700000', '700000'].map((range, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="price"
                    onChange={() => setPriceRange(range)}
                  />
                  {range === '700000' ? '700,000đ Trở Lên' : `${range.replace('-', 'đ - ')}đ`}
                </label>
              </li>
            ))}
          </ul>

          {/* Language */}
          <h4>Ngôn ngữ</h4>
          <ul className="suppliers-list">
            {['Vietnamese', 'English', 'French'].map((lang, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="supplier"
                    onChange={() => setSelectedSupplier(lang)}
                  />
                  {lang === 'Vietnamese' ? 'Tiếng Việt' : lang === 'English' ? 'Tiếng Anh' : 'Tiếng Pháp'}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="main-content">
          <RenderContent books={currentProducts} />
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default AdvancedSearch;
