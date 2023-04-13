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
import { clearError } from "../../reduxToolkit/reducer/product/productAdminSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const {error, isLoading, success} = useSelector((state) => state.newproduct);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
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
  };
  const handleCreateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagePreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result])
        }
      };
      reader.readAsDataURL(file);
    })
  }
  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearError)
    }
    if(success) {
      toast.success("Product created successfully");
      navigate("/admin/allproducts");
    }
    return () => {
      
    }
  }, [])
  
  return (
    <div className="create-product">
      <form encType="multipart/form-data" onSubmit={(e) => handleSubmitCreateProduct(e)}>
        <label htmlFor="productName">
          Product name <BsFillPhoneFill />
        </label>
        <input
          type="text"
          required
          id="productName"
          placeholder="product name..."
          value={name}
        />
        <label htmlFor="productPrice">
          Price <BsCoin />
        </label>
        <input
          type="number"
          required
          id="productPrice"
          placeholder="price"
          step={1000000}
          min={0}
          max={100000000}
          value={price}
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
          placeholder="description..."
        ></textarea>
        <label htmlFor="model">
          Category <BsFillTagFill />
        </label>
        <select name="model" id="model" defaultValue="" onChange={(e) => setCategory(e.target.value)}>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProduct;
