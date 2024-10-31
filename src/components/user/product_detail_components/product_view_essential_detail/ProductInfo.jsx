import React from "react";
import { CiStar } from "react-icons/ci";

function ProductInfo({ productInfo }) {
  return (
    <div className="product-infor-content">
      <div className="name-product">
        <h4>{productInfo.title}</h4>
      </div>
      <div className="suplier-and-author">
        <div className="suplier">
          <p>
            Suplier:<strong>{productInfo.publisher || "N/A"}</strong>
          </p>
        </div>
        <div className="author">
          <p>
            Author:
            <strong>
              {productInfo.author?.map((item, index) => (
                <span>
                  {index !== productInfo.author.length - 1
                    ? `${item}-`
                    : `${item}`}
                </span>
              )) || "N/A"}
            </strong>
          </p>
        </div>
      </div>
      <div className="publisher">
        <p>
          Publisher: <strong>{productInfo.publisher || "N/A"}</strong>
        </p>
      </div>
      <div className="vote-and-sale">
        <div className="vote">
          <CiStar className="far fa-star rating-color" size={20}></CiStar>
          <CiStar className="far fa-star rating-color" size={20}></CiStar>
          <CiStar className="far fa-star rating-color" size={20}></CiStar>
          <CiStar className="far fa-star rating-color" size={20}></CiStar>
          <CiStar className="far fa-star rating-color" size={20}></CiStar>
        </div>
        <div className="sale">
          <p>|</p>
          <span>aaaaaa</span>
        </div>
      </div>
      <div className="price-and-discount">
        <div className="price-discount">
          <h2>143.000 đ</h2>
        </div>
        <div className="price-product">
          <p>{productInfo.salePrice}</p>
        </div>
        <div className="discount">
          <strong>-{23}%</strong>
        </div>
      </div>
      {productInfo.stock > 0 ? (
        <></>
      ) : (
        <div className="out-of-stock">
          <p>Product temporarily out of stock</p>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
