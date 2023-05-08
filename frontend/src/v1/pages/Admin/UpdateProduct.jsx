import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import {
  BsFillPhoneFill,
  BsCoin,
  BsCardHeading,
  BsFillTagFill,
  BsFillInboxesFill,
  BsFillImageFill,
} from "react-icons/bs";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const {isLoading, error, isUpdate} = useSelector((state) => state.product);
  const {id} = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const categories = ["Samsung", "Xiaomi", "Apple", "Oppo"];
  const handleSubmitCreateProduct = () => {

  }
  useEffect(() => {
    
  
    
  }, [dispatch])
  
  return (
    <>
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
          value={Stock}
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
          
          placeholder=""
        />
        <div className="imgasPreview">
          {/* {imagePreview.map((image, index) => {
            <img key={index} src={image} alt="Product Preview" />;
          })} */}
        </div>
        <button type="submit" >
          Create
        </button>
      </form>
    </div>
    </>
  )
}

export default UpdateProduct