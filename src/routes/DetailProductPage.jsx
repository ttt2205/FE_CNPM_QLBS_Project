import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BreadScumb,
  ProductViewEssentialMedia,
  ProductViewReview,
  TabsliderTabRelatedProduct,
  ProductViewEssentialDetail,
} from "../components/user/product_detail_components";
import "../assets/scss/DetailProductPage.scss";
import {
  getDetailProductDataService,
  getRelatedProductDataService,
} from "../services/detailProductService";

function DetailProductPage() {
  // Thuc hien lay product id
  const { productId } = useParams();

  const [detailProduct, setDetailProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const checkInputProductId = () => {
    const id = Number(productId);
    if (!isNaN(id)) return true;
    return false;
  };

  // Get detail product
  useEffect(() => {
    if (checkInputProductId()) {
      const getDetailProductData = async () => {
        try {
          const responeDetailProduct = await getDetailProductDataService(
            productId
          );
          setDetailProduct(responeDetailProduct.data.products);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Product not found");
            console.log(error.response);
          } else {
            console.log(
              "Error fetching product or related product data:",
              error.message
            );
            console.log(">>>Stack: ", error.stack);
          }
        }
      };
      getDetailProductData(); // Gọi hàm async
    }
  }, []);

  // Get related products based on genreId of detail product
  useEffect(() => {
    // Kiểm tra nếu genreId đã tồn tại trước khi gọi API
    if (detailProduct.genreId) {
      const getRelatedProductData = async () => {
        try {
          const responeRelatedProduct = await getRelatedProductDataService(
            productId,
            detailProduct.genreId
          );
          setRelatedProducts(responeRelatedProduct.data.relatedProducts);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            console.log("Related product not found");
            console.log(error.response);
          } else {
            console.log("Error fetching related product data:", error.message);
            console.log(">>>Stack: ", error.stack);
          }
        }
      };
      getRelatedProductData();
    }
  }, [detailProduct.genreId]);

  useEffect(() => {
    console.log(relatedProducts);
  }, [relatedProducts]);
  return (
    <>
      {!checkInputProductId() ||
      !detailProduct ||
      Object.keys(detailProduct).length === 0 ? (
        <>
          <h2>Product is not exist</h2>
        </>
      ) : (
        <>
          <div id="breadscumbs" className="breadscumb-container">
            <BreadScumb></BreadScumb>
          </div>
          <form id="product_addToCart_form">
            {/* <!-- begin product view UI --> */}
            <div id="product_view_detail" className="product-essential">
              <ProductViewEssentialMedia
                productID={productId}
              ></ProductViewEssentialMedia>
              <ProductViewEssentialDetail
                detailProduct={detailProduct}
              ></ProductViewEssentialDetail>
            </div>
          </form>
          <div
            id="tabslider_tab_relatedproduct"
            className="tabslider-relatedproduct-container"
          >
            <TabsliderTabRelatedProduct
              relatedProducts={relatedProducts}
            ></TabsliderTabRelatedProduct>
          </div>
          <div
            id="product_view_review"
            className="product-view-review-container"
          >
            <ProductViewReview></ProductViewReview>
          </div>
        </>
      )}
    </>
  );
}

export default DetailProductPage;
