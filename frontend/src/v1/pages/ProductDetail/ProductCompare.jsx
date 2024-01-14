import React, { useEffect } from "react";
import { BiGitCompare } from "react-icons/bi";
import {
  clearErrorCompare,
  resetToCompare,
} from "../../reduxToolkit/reducer/product/compareProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addCompareList,
  deleteCompare,
  getCompareList,
} from "../../reduxToolkit/actions/productAction";
import "./product-compare.css"
const ProductCompare = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const { success, error, compareList } = useSelector((state) => state.compare);
  const handleAddCompare = () => {
    dispatch(addCompareList(product?._id));
  };
  const handleDeleteCompare = (id) => {
    dispatch(deleteCompare(id));
  }
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
      dispatch(clearErrorCompare());
    }
  }, [dispatch,error]);
  
  useEffect(() => {
    if (success) {
      toast.success("Added product to compare");
      dispatch(resetToCompare());
    }
    dispatch(getCompareList());
  }, [dispatch, success]);

  return (
    <>
      <div className="dropdown product-compare">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Compare
        </button>
        <ul className="dropdown-menu" >
            
          <li onClick={handleAddCompare}>
            <BiGitCompare /> Add to compare
          </li>
          <li
            data-bs-toggle="modal"
            data-bs-target="#compareModal"
          >
            Show compare
          </li>
        </ul>
      </div>
      <div
        className="modal fade"
        id="compareModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-6" id="exampleModalLabel">
                Compare
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {compareList.length > 0 && compareList.map((item) => {
                  console.log(compareList);
                  return (
                  <div className="col-6 d-flex align-items-center justify-content-between flex-column" key={item?.product_id?._id}>
                    <img className="rounded" src={item?.product_id?.images[0]?.url} alt={item?.product_id?._id}/>
                    <p className="name">{item?.product_id?.name}</p>
                    <p className="price">{Math.round(item?.product_id?.price/23000)} $</p>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCompare(item?.product_id?._id)}>Delete</button>
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCompare;
