import React, { useEffect, useState } from "react";
import {
  DeliveryInfo,
  DescriptionProduct,
  DetailProductInfo,
  ProductInfo,
} from "./product_view_essential_detail";

function ProductViewEssentialDetail({
  detailProduct = {}, // Giá trị mặc định là một object rỗng
  count,
  handleQuantityChange,
  getDiscountValueLatest,
  handleChangeAddress,
}) {
  const [productInfo, setProductInfo] = useState({});
  const [detailProductInfo, setDetailProductInfo] = useState({});
  const [descriptionProduct, setDescriptionProduct] = useState({});

  useEffect(() => {
    // Kiểm tra dữ liệu và thiết lập giá trị mặc định an toàn
    const stock = Array.isArray(detailProduct.stock) ? detailProduct.stock : [];
    const authors = Array.isArray(detailProduct.authors)
      ? detailProduct.authors.map((item) => item.name)
      : ["Không có tác giả"];
    const publisher = detailProduct.publisher?.name || "Không có nhà xuất bản";
    const language = detailProduct.language?.language_name || "Không xác định";
    const coverFormat = detailProduct.coverFormat?.name || "Không xác định";
    const stockQuantity = detailProduct.stock_quantity || 0;
    const salePrice = detailProduct.sale_price || 0;

    const suplier = stock
      .flatMap((item) =>
        Array.isArray(item.goodsreceipts)
          ? item.goodsreceipts.map((item1) => item1.provider?.name)
          : []
      )
      .filter((value, index, self) => self.indexOf(value) === index);

    const bestDiscount = getDiscountValueLatest(detailProduct.discounts || []);

    setProductInfo({
      title: detailProduct.title || "Sản phẩm không xác định",
      suplier: suplier.length > 0 ? suplier : ["Không có nhà cung cấp"],
      publisher,
      author: authors,
      stock: stockQuantity,
      salePrice,
      discountValue: bestDiscount?.value || 0,
    });

    setDetailProductInfo({
      productCode: detailProduct.book_id || "Không xác định",
      suplier: suplier.length > 0 ? suplier : ["Không có nhà cung cấp"],
      author: authors,
      publisher,
      publisherYear: detailProduct.publication_year || "Không xác định",
      coverFormat,
      language,
      weight: detailProduct.weight || "Không xác định",
      size: detailProduct.size || "Không xác định",
      quantityOfPage: detailProduct.num_page || "Không xác định",
    });

    setDescriptionProduct({
      title: detailProduct.title || "Sản phẩm không xác định",
      description: detailProduct.decription || "Không có mô tả",
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
