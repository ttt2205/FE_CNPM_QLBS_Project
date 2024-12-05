import React, { useEffect, useState } from "react";
import {
  DeliveryInfo,
  DescriptionProduct,
  DetailProductInfo,
  ProductInfo,
} from "./product_view_essential_detail";
import { useAuth } from "context/AuthContext";

function ProductViewEssentialDetail({
  detailProduct,
  count,
  handleQuantityChange,
  getDiscountValueLatest,
  handleChangeAddress,
}) {
  const [productInfo, setProductInfo] = useState({});

  const [detailProductInfo, setDetailProductInfo] = useState({});

  const [descriptionProduct, setDescriptionProduct] = useState({});
  // const {user} = useAuth();

  useEffect(() => {
    const bestDiscount = getDiscountValueLatest(detailProduct.discounts);
    setProductInfo({
      title: detailProduct.title,
      suplier: detailProduct.stock
        .map((item) => item.goodsreceipts.map((item1) => item1.provider.name))
        .filter((value, index, self) => self.indexOf(value) === index),
      publisher: detailProduct.publisher.name,
      author: detailProduct.authors?.map((item) => item.name),
      stock: detailProduct.stock_quantity,
      salePrice: detailProduct.sale_price,
      discountValue: bestDiscount.value,
    });

    setDetailProductInfo({
      productCode: detailProduct.book_id,
      suplier: detailProduct.stock
        .map((item) => item.goodsreceipts.map((item1) => item1.provider.name))
        .filter((value, index, self) => self.indexOf(value) === index),
      author: detailProduct.authors?.map((item) => item.name),
      publisher: detailProduct.publisher.name,
      publisherYear: detailProduct.publication_year,
      coverFormat: detailProduct.coverFormat.name,
      language: detailProduct.language.language_name,
      weight: detailProduct.weight,
      size: detailProduct.size,
      quantityOfPage: detailProduct.num_page,
    });

    setDescriptionProduct({
      title: detailProduct.title,
      description: detailProduct.decription,
    });
  }, [detailProduct]);

  return (
    <div className="product-essential-content-detail-parent">
      <div className="product-essential-content-detail">
        <div id="product_infor" className="product-infor-container">
          <ProductInfo productInfo={productInfo}></ProductInfo>
        </div>
        <div id="delivery_infor" className="delivery-infor-container">
          <DeliveryInfo
            count={count}
            handleQuantityChange={handleQuantityChange}
            handleChangeAddress={handleChangeAddress}
          ></DeliveryInfo>
        </div>
        <div
          id="detail_product_infor"
          className="detail-product-info-container"
        >
          <DetailProductInfo
            detailProductInfo={detailProductInfo}
            count={count}
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
