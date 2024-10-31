import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import {
  ProductViewThumbnail,
  ProductViewPolicy,
} from "./product_view_essential_media";
import { getImagesForThumbnail } from "../../../services/detailProductService";
function ProductViewEsstenialMedia({ productID }) {
  const [images, setImages] = useState([]);
  const [imageCurrent, setImageCurrent] = useState("");

  useEffect(() => {
    const fetchImageForThumbnailData = async () => {
      try {
        const ImageRespone = await getImagesForThumbnail(productID);
        const dataImages = chunksArray(ImageRespone.data.images, 4);

        for (let i = 0; i < ImageRespone.data.images.length; i++) {
          if (ImageRespone.data.images[i].is_main === 1) {
            setImageCurrent(ImageRespone.data.images[i].url);
            break;
          }
        }

        setImages(dataImages);
      } catch (error) {
        console.log("Fetching data thumbnail error = ", error);
      }
    };
    fetchImageForThumbnailData();
  }, []);

  // useEffect(() => {
  //   console.log(imageCurrent); // This will log after state has been updated
  // }, [images]); // Runs every time `tabsRelatedProduct` changes

  // Phan chia thumbnailImages thanh 4 phan trong 1 nhom
  const chunksArray = (arr, size) => {
    let newArr = [];
    let length = arr.length;
    for (let i = 0; i < length; i += size) {
      newArr.push(arr.slice(i, i + size));
    }
    return newArr;
  };

  const getPathImage = (imageName) => {
    return `/asset/images/${imageName}`;
  };

  const handleOnclickThumbnail = (imageClicked) => {
    setImageCurrent(imageClicked);
  };

  return (
    <>
      <div className="product-essential-content-media-parent">
        <div className="product-essential-media">
          <div className="product-view-media-addtocard">
            <div className="product-view-image">
              <div className="product-view-image-product">
                <img src={getPathImage(imageCurrent)} alt="Image not found" />
              </div>

              <div className="product-view-thumbnail-parent">
                <ProductViewThumbnail
                  images={images}
                  handleOnclickThumbnail={handleOnclickThumbnail}
                ></ProductViewThumbnail>
              </div>
            </div>
            <div className="product-view-add-box">
              <button id="btn-add-to-card" className="btn-add-box">
                <BsCart3 size={20}></BsCart3>
                <span>Thêm vào giỏ hàng</span>
              </button>
              <button id="btn-buy" className="btn-add-box">
                <span>Mua ngay</span>
              </button>
            </div>
          </div>

          <div className="product-view-policy">
            <ProductViewPolicy></ProductViewPolicy>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductViewEsstenialMedia;
