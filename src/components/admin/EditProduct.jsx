import {
  Form,
  useLoaderData,
  redirect,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { useState } from "react";
import {
  getProductById,
  updateProduct,
  getAllReferences,
} from "services/productServices";
import { toast } from "react-toastify";
import ImageCarousel from "components/admin/ImageCarousel";

export async function loader({ params }) {
  const product = await getProductById(params.productId);
  const allReferences = await getAllReferences();
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product, allReferences };
}

export async function action({ request, params }) {
  //gan deletedImages vao form data
  //...

  const formData = await request.formData();
  // Lấy tất cả các file từ input file (giả sử input có tên "images")
  const newImages = formData.getAll("new_images"); // Thay "images" bằng tên của input file
  const deletedImages = formData.getAll("deletedImages[]");
  console.log(newImages);
  console.log(deletedImages);
  const updates = Object.fromEntries(formData);
  console.log(updates);
  try {
    await updateProduct(params.productId, formData);
    toast.success("Update product success");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }

  return redirect(`/dashboard/products/`);
}

export default function EditProduct() {
  const { product, allReferences } = useLoaderData();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const submit = useSubmit();
  const [deletedImages, setDeletedImages] = useState([]);

  const validate = (form) => {
    const newErrors = {};

    // Lấy giá trị từ các input và kiểm tra tính hợp lệ
    const title = form.title.value.trim();
    const numPage = form.num_page.value.trim();
    const priceReceipt = form.price_receipt.value.trim();
    const size = form.size.value.trim();
    const weight = form.weight.value.trim();
    const publication_year = form.publication_year.value.trim();
    const profit_rate = form.profit_rate.value.trim();
    const stock_quantity = form.stock_quantity.value.trim();
    // const status_id = form.status_id.value.trim();
    // const language_id = form.language_id.value.trim();
    // const publisher_id = form.publisher_id.value.trim();
    // const genre_id = form.genre_id.value.trim();
    // const discount_id = form.discount_id.value.trim();
    // const cover_format_id = form.cover_format_id.value.trim();

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!numPage || isNaN(numPage)) {
      newErrors.num_page = "Number of pages must be a number";
    }
    if (!priceReceipt || isNaN(priceReceipt)) {
      newErrors.price_receipt = "Price receipt must be a number";
    }
    if (priceReceipt < 0 || priceReceipt === "") {
      newErrors.price_receipt = "Price receipt must be greater than 0";
    }
    if (numPage < 0) {
      newErrors.num_page = "Number of pages must be greater than 0";
    }
    if (size < 0 || size === "") {
      newErrors.size = "Size must not be empty";
    }
    if (weight < 0 || weight === "") {
      newErrors.weight = "Weight must be greater than 0";
    }
    if (publication_year < 0) {
      newErrors.publication_year = "Publication year must be greater than 0";
    }
    if (profit_rate < 0) {
      newErrors.profit_rate = "Profit rate must be greater than 0";
    }
    if (stock_quantity < 0) {
      newErrors.stock_quantity = "Stock quantity must be greater than 0";
    }
    // if (status_id === "" || status_id < 0) {
    //   newErrors.status_id = "Status id must not be empty";
    // }
    // if (language_id === "" || language_id < 0) {
    //   newErrors.language_id = "Language id must not be empty";
    // }
    // if (publisher_id === "" || publisher_id < 0) {
    //   newErrors.publisher_id = "Publisher id must not be empty";
    // }
    // if (genre_id === "" || genre_id < 0) {
    //   newErrors.genre_id = "Genre id must not be empty";
    // }
    // if (discount_id === "" || discount_id < 0) {
    //   newErrors.discount_id = "Discount id must not be empty";
    // }
    // if (cover_format_id === "" || cover_format_id < 0) {
    //   newErrors.cover_format_id = "Cover format id must not be empty";
    // }

    // Thêm các validate khác tùy theo yêu cầu của từng trường
    // Ví dụ: kiểm tra trọng lượng, năm xuất bản, v.v.

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    //them deletedImages vao form data
    deletedImages.forEach((img) => {
      formData.append("deletedImages[]", img.bookImage_id); // Gán từng ID vào FormData
    });

    let newErrors = validate(event.currentTarget);
    // Nếu có lỗi, hiển thị thông báo lỗi
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Lỗi nhập liệu, vui lòng kiểm tra lại");
    } else {
      setErrors({});
      submit(formData, { method: "post", encType: "multipart/form-data" });
    }
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col col-md-auto col-lg-6">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              defaultValue={product?.title}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Num Page</label>
            <input
              type="text"
              className="form-control"
              name="num_page"
              defaultValue={product?.num_page}
            />
            {errors.num_page && (
              <p style={{ color: "red" }}>{errors.num_page}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Size</label>
            <input
              type="text"
              className="form-control"
              name="size"
              defaultValue={product?.size}
            />
            {errors.size && <p style={{ color: "red" }}>{errors.size}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Weight</label>
            <input
              type="text"
              className="form-control"
              name="weight"
              defaultValue={product?.weight}
            />
            {errors.weight && <p style={{ color: "red" }}>{errors.weight}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Publication Year</label>
            <input
              type="text"
              className="form-control"
              name="publication_year"
              defaultValue={product?.publication_year}
            />
            {errors.publication_year && (
              <p style={{ color: "red" }}>{errors.publication_year}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Price Receipt</label>
            <input
              type="text"
              className="form-control"
              name="price_receipt"
              defaultValue={product?.price_receipt}
              disabled={true}
            />
            {errors.price_receipt && (
              <p style={{ color: "red" }}>{errors.price_receipt}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control"
              name="decription"
              defaultValue={product?.decription}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>
        </div>
        <div className="col col-md-auto col-lg-6 d-flex flex-column">
          <ImageCarousel
            product={product}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
          />
        </div>
      </div>

      <div className="row">
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Profit Rate</label>
          <input
            type="text"
            className="form-control"
            name="profit_rate"
            defaultValue={product?.profit_rate}
          />
          {errors.profit_rate && (
            <p style={{ color: "red" }}>{errors.profit_rate}</p>
          )}
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Stock Quantity</label>
          <input
            type="text"
            className="form-control"
            name="stock_quantity"
            defaultValue={product?.stock_quantity}
          />
          {errors.stock_quantity && (
            <p style={{ color: "red" }}>{errors.stock_quantity}</p>
          )}
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status_id"
            defaultValue={product.book_id}
          >
            {allReferences.bookstatus.map((status) => (
              <option key={status.id} value={status.id}>
                {status.status_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Language</label>
          <select
            className="form-select"
            name="language_id"
            defaultValue={product.language_id}
          >
            {allReferences.languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.language_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Publisher</label>
          <select
            className="form-select"
            name="publisher_id"
            defaultValue={product.publisher_id}
          >
            {allReferences.publishers.map((publisher) => (
              <option
                key={publisher.publisher_id}
                value={publisher.publisher_id}
              >
                {publisher.name}
              </option>
            ))}
          </select>
          {errors.publisher_id && (
            <p style={{ color: "red" }}>{errors.publisher_id}</p>
          )}
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Genre</label>
          <select
            className="form-select"
            name="genre_id"
            defaultValue={product.genre_id}
          >
            {allReferences.genres.map((genre) => (
              <option key={genre.genre_id} value={genre.genre_id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Discount</label>
          <select
            className="form-select"
            name="discount_id"
            defaultValue={product.discount_id || ""}
          >
            <option value="">No discount</option>
            {allReferences.discounts.map((discount) => (
              <option key={discount.discount_id} value={discount.discount_id}>
                {discount.discount_name}
              </option>
            ))}
          </select>
        </div>
        <div className="col col-md-auto col-lg-3 form-group">
          <label className="form-label">Cover Format</label>
          <select className="form-select" name="cover_format_id">
            {allReferences.coverformats.map((coverformat) => (
              <option key={coverformat.cover_id} value={coverformat.cover_id}>
                {coverformat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </button>
    </Form>
  );
}
