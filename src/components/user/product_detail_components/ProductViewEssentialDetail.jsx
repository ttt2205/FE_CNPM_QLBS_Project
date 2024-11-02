import React, { useEffect, useState } from "react";
import {
  DeliveryInfo,
  DescriptionProduct,
  DetailProductInfo,
  ProductInfo,
} from "./product_view_essential_detail";
import { useAuth } from "context/AuthContext";

function ProductViewEssentialDetail({ detailProduct }) {
  const [productInfo, setProductInfo] = useState({});

  const [detailProductInfo, setDetailProductInfo] = useState({});

  const [descriptionProduct, setDescriptionProduct] = useState({});
  // const {user} = useAuth();

  useEffect(() => {
    setProductInfo({
      title: detailProduct.title,
      publisher: detailProduct.publisher,
      author: detailProduct.authors?.map((item) => item.name),
      stock: detailProduct.stock,
      salePrice: detailProduct.salePrice,
    });

    setDetailProductInfo({
      productCode: detailProduct.id,
      suplier: detailProduct.goodsReceipts?.map((item, index) => item.provider),
      author: detailProduct.authors?.map((item) => item.name),
      publisher: detailProduct.publisher,
      publisherYear: detailProduct.publisherYear,
      weight: detailProduct.weight,
      size: detailProduct.size,
      quantityOfPage: detailProduct.numPage,
    });

    setDescriptionProduct({
      title: detailProduct.title,
      description: detailProduct.description,
    });
  }, [detailProduct]);

  return (
    <div className="product-essential-content-detail-parent">
      <div className="product-essential-content-detail">
        <div id="product_infor" className="product-infor-container">
          <ProductInfo productInfo={productInfo}></ProductInfo>
        </div>
        <div id="delivery_infor" className="delivery-infor-container">
          <DeliveryInfo></DeliveryInfo>
        </div>
        <div
          id="detail_product_infor"
          className="detail-product-info-container"
        >
          <DetailProductInfo
            detailProductInfo={detailProductInfo}
          ></DetailProductInfo>
        </div>
        <div id="description_product" className="description-product-container">
          <DescriptionProduct
            descriptionProduct={descriptionProduct}
          ></DescriptionProduct>
        </div>
      </div>
    </div>
  );
}

export default ProductViewEssentialDetail;
