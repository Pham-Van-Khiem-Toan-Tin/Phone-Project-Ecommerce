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
import "./CreateProduct.css";
import {
  clearErrorNewProduct,
  resetNewProduct,
} from "../../reduxToolkit/reducer/product/productAdminSlice";
import { useNavigate } from "react-router-dom";
import { newProduct } from "../../reduxToolkit/actions/productAction";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector(
    (state) => state.newproduct
  );
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(20);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorNewProduct());
    }
    if (success) {
      toast.success("Product created successfully");
      navigate("/admin/allproducts");
      dispatch(resetNewProduct());
    }
  }, [dispatch, error, navigate, success]);

  const handleSubmitCreateProduct = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("description", description);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(newProduct(myForm));
  };
  const handleCreateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="create-product">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmitCreateProduct}
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
          
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Chose category</option>
          <option value="Samsung">SamSung</option>
          <option value="Apple">Apple</option>
          <option value="Oppo">Oppo</option>
          <option value="Xiaomi">Xiaomi</option>
        </select>
        <label htmlFor="productStock">
          Stock <BsFillInboxesFill />{" "}
        </label>
        <input
          type="number"
          id="productStock"
          required
          min={1}
          value={stock}
          placeholder="Stock"
          onChange={(e) => setStock(e.target.value)}
        />
        <label htmlFor="productImage">
          Image <BsFillImageFill />
        </label>
        <input
          type="file"
          multiple={true}
          id="productImage"
          name="avatar"
          accept="image/*"
          onChange={handleCreateProductImagesChange}
          placeholder=""
        />
        <div className="imgasPreview">
          {imagePreview.map((image, index) => {
            <img key={index} src={image} alt="Product Preview" />;
          })}
        </div>
        <button type="submit" >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
