import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  BsFillPhoneFill,
  BsCoin,
  BsCardHeading,
  BsFillTagFill,
  BsFillInboxesFill,
  BsFillImageFill,
} from "react-icons/bs";
import {clearError} from "../../reduxToolkit/reducer/product/productDetailSlice";
import { getProductDetail, updateProduct } from "../../reduxToolkit/actions/productAction";
import { toast } from "react-toastify";
import { clearErrorHandle, resetUpdate } from "../../reduxToolkit/reducer/product/productSlice";
const UpdateProduct = ( { SideBarComponent, HeaderComponent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const {isLoading: isLoadingUpdate, error: errorUpdate, isUpdate} = useSelector((state) => state.product);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const handleSubmitChangeProduct = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("stock", Stock);
    myForm.set("category", category);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct({myForm, id}))
  };
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearError());
    }
    if(errorUpdate) {
      toast.error(errorUpdate);
      dispatch(clearErrorHandle());
    }
    if(isUpdate) {
      toast.success("Product Changed!!!");
      navigate("/admin/allproducts")
      dispatch(resetUpdate());
    }
  }, [error, errorUpdate, dispatch, isUpdate]);
  useEffect(() => {
    if ((product && product._id !== id) || !product) {
      dispatch(getProductDetail(id));
    }
    if (product && product._id === id) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
  }, [dispatch, product, id]);
  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="create-product">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmitChangeProduct}
        >
          <label htmlFor="productName">
            Product name <BsFillPhoneFill />
          </label>
          <input
            type="text"
            required
            id="productName"
            placeholder="product name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="productPrice">
            Price <BsCoin />
          </label>
          <input
            type="number"
            required
            id="productPrice"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="productDescription">
            Description <BsCardHeading />
          </label>
          <textarea
            cols="30"
            rows="2"
            required
            id="productDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description..."
          ></textarea>
          <label htmlFor="model">
            Category <BsFillTagFill />
          </label>
          <select
            name="model"
            id="model"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Samsung">SamSung</option>
            <option value="Apple">Apple</option>
            <option value="Oppo">Oppo</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
          <label htmlFor="model">
            Sub Categories <BsFillTagFill />
          </label>
          <select
            name="model"
            id="model"
          >
            <option>Pro</option>
          </select>
          <label htmlFor="productStock">
            Stock <BsFillInboxesFill />{" "}
          </label>
          <input
            type="number"
            id="productStock"
            required
            min={1}
            value={Stock}
            placeholder="Stock"
            onChange={(e) => setStock(e.target.value)}
          />
          <label htmlFor="productImage">
            Image <BsFillImageFill />
          </label>
          <input
            type="file"
            multiple
            id="productImage"
            name="avatar"
            accept="image/*"
            onChange={updateProductImagesChange}
            placeholder=""
          />
          <div className="imagesOldImages">
            {oldImages.length > 0 && (
              <>
                <h6>Old images: </h6>
                {oldImages.map((oldimage, index) => (
                  <img key={index} src={oldimage.url} alt="" />
                ))}
              </>
            )}
          </div>
          <div className="imagesPreview">
            {imagesPreview.length > 0 && (
              <>
                <h6>New images: </h6>
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </>
            )}
          </div>
          <label htmlFor="model">
            Chose color image
          </label>
          <select
            name="model"
            id="model"
          >
            <option>red, blue</option>
          </select>
          <label htmlFor="model">
            Chose image primary
          </label>
          <select
            name="model"
            id="model"
          >
            <option>1</option>
          </select>
          <button type="submit">Change</button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
