import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  BsFillPhoneFill,
  BsCoin,
  BsCardHeading,
  BsFillTagFill,
  BsFillInboxesFill,
  BsFillImageFill,
} from "react-icons/bs";
import "./create-product.css";
import {
  clearError,
  resetNewProduct,
} from "../../reduxToolkit/reducer/product/newProductSlice";
import { useNavigate } from "react-router-dom";
import { newProduct } from "../../reduxToolkit/actions/productAction";
import { getAllColor } from "../../reduxToolkit/actions/color.action";

const CreateProduct = ({ SideBarComponent, HeaderComponent }) => {
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector(
    (state) => state.newProduct
  );
  const { colors, resultPerPage, filteredColorCount, message } = useSelector(
    (state) => state.color
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Product created successfully");
      navigate("/admin/allproducts");
      dispatch(resetNewProduct());
    }
    dispatch(getAllColor({ page: 1, key: "" }));
  }, [dispatch, error, navigate, success]);
  const handleSelectPrimary = (e) => {
    setImagePreview((old) => {
      old[e.target.value] = { ...old[e.target.value], order: 1 };
      return [...old];
    });
  };
  const handleChangeColor = (e, index) => {
    setImagePreview((old) => {
      old[index] = {
        ...old[index],
        color: e.target.value._id,
        hex: e.target.value.hex,
      };
      return [...old];
    });
  };
  const handleChangeStock = (e, index) => {
    setImagePreview((old) => {
      old[index] = {
        ...old[index],
        stock: e.target.value
      }
      return [...old];
    })
  }
  const handleSubmitCreateProduct = (e) => {
    console.log(imagePreview);
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("description", description);
    imagePreview.forEach((image, index) => {
      myForm.append(`images[${index}][src]`, image.src);
      myForm.append(`images[${index}][hex]`, image.hex);
      myForm.append(`images[${index}][color]`, image.color);
      myForm.append(`images[${index}][stock]`, image.stock);
    });
    console.log("Form data:");
    for (const pair of myForm.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(newProduct(myForm));
  };

  const handleCreateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, { src: reader.result }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="create-product">
        <p className="title">Create Product</p>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <span className="fw-bold">Home</span>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              new-product
            </li>
          </ol>
        </nav>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmitCreateProduct}
        >
          <h5>Generate Information</h5>
          <label htmlFor="product-name">
            Product name: <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            required
            id="product-name"
            placeholder="product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="product-cost">
            Cost: <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            required
            id="product-cost"
            className="form-control"
            placeholder="price"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <label htmlFor="product-price">
            Price: <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            required
            id="product-price"
            className="form-control"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="product-description">
            Description: <span className="text-danger">*</span>
          </label>
          <textarea
            cols="30"
            rows="2"
            required
            id="product-description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description..."
          ></textarea>
          <label htmlFor="category">
            Category: <span className="text-danger">*</span>
          </label>
          <select
            name="category"
            id="category"
            className="form-select"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Chose category</option>
            <option value="Samsung">SamSung</option>
            <option value="Apple">Apple</option>
            <option value="Oppo">Oppo</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
          <label htmlFor="sub-category">
            Sub Categories: <span className="text-danger">*</span>
          </label>
          <select name="sub-category" id="sub-category" className="form-select">
            <option>Pro</option>
          </select>
          <label htmlFor="productImage">
            Image <BsFillImageFill />: <span className="text-danger">*</span>
          </label>
          <input
            type="file"
            multiple
            id="product-image"
            name="avatar"
            accept="image/*"
            onChange={handleCreateProductImagesChange}
            placeholder=""
          />
          <div className="imagesPreview">
            {imagePreview.map((image, index) => {
              return (
                <div key={index}>
                  <img
                    src={image.src}
                    className="image-preview"
                    alt="Product Preview"
                  />
                  
                  <label htmlFor={"color" + index} className="form-label">
                    Color picker
                  </label>
                  {image?.color && (
                    <input
                      type="color"
                      class="form-control form-control-color"
                      value={image.hex}
                      title="Choose your color"
                    />
                  )}
                  <select
                    className="form-select"
                    onChange={(e) => handleChangeColor(e, index)}
                    id={"color" + index}
                    title="Choose your color"
                  >
                    {colors &&
                      colors.map((item) => (
                        <option value={item}>{item._id}</option>
                      ))}
                  </select>
                  {image?.order && <p>Main: true</p>}
                  <label htmlFor="product-stock">
                    Stock: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    min={0}
                    value={image.stock ? image.stock : 20}
                    placeholder="Stock"
                    onChange={(e) => handleChangeStock(e, index)}
                  />
                </div>
              );
            })}
          </div>
          <label htmlFor="primary">
            Chose image primary: <span className="text-danger">*</span>
          </label>
          <select
            name="primay"
            id="primary"
            className="form-select"
            onChange={handleSelectPrimary}
          >
            <option value="">Chose image primary</option>
            {imagePreview.map((item, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          <button type="submit" disabled={isLoading}>
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
