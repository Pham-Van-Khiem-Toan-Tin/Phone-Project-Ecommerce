import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./category-management.css";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "../../reduxToolkit/actions/category.action";
import { reset } from "../../reduxToolkit/reducer/category/category.slice";
const CategoriesManagement = ({ SideBarComponent, HeaderComponent }) => {
  const { categories, resultPerPage, filteredCategoryCount, success, message } =
    useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    parent: "",
  });
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const handleSearch = () => {
    dispatch(getAllCategory({ page: currentPage, key: keyWord.trim() }));
  };
  const handleSelectItemEdit = (item) => {
    setSelectedItem({ ...item });
  };
  const handleCloseEditModal = () => {
    setSelectedItem(null);
  };
  const handleCreate = () => {
    dispatch(
      createCategory({
        name: newCategory.name.trim(),
        description: newCategory.description.trim(),
        parentId: newCategory.parent,
      })
    );
  };
  const handleEdit = () => {
    console.log("chay vao day");
    dispatch(
      updateCategory({
        id: selectedItem._id,
        name: selectedItem.name.trim(),
        description: selectedItem.description.trim(),
        parentId: selectedItem.parent._id || (selectedItem.parent || ""),
      })
    );
  };
  useEffect(() => {
    const storedCurrentPage = JSON.parse(localStorage.getItem("all-category"));
    setCurrentPage(storedCurrentPage || 1);
    dispatch(getAllCategory({ page: currentPage, key: keyWord.trim() }));
    if (success) {
      toast.success(message);
      dispatch(reset());
    }
  }, [dispatch, currentPage, success]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="categories-management">
        <p className="title">Category</p>
        <div className="d-flex align-items-center justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                category
              </li>
            </ol>
          </nav>
          <div>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#create-modal"
            >
              Create
            </button>
          </div>
        </div>
        <div className="category-list p-2 mt-2 rounded">
          <p className="title">Last Orders</p>
          <div className="btn-handle-group">
            <div className="sort">
              <label htmlFor="sort">Sort by: </label>
              <select className="form-select" id="sort">
                <option value="name">Name</option>
                <option value="day">Created At</option>
              </select>
            </div>
            <div className="search">
              <input
                className="form-control"
                onChange={(e) => setKeyWord(e.target.value)}
                type="text"
                placeholder="key word search"
              />
              <button className="btn btn-sm btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Parent</th>
                  <th scope="col">Description</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item?.name}</th>
                        <td>
                          {item?.parent ? item?.parent?.name : "No parent"}
                        </td>
                        <td>{item?.description}</td>
                        <td>
                          {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                        </td>
                        <td className="action">
                          <button className="btn btn-sm">
                            <button
                              type="button"
                              className="btn btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-modal"
                              onClick={() => handleSelectItemEdit(item)}
                            >
                              <FaEdit />
                            </button>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  disabled={currentPage > 1 ? false : true}
                  onClick={() => {
                    if (currentPage > 1) {
                      localStorage.setItem("all-orders", currentPage - 1);
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button className="page-link active" disabled={true}>
                  {currentPage}
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  disabled={
                    categories?.length !== resultPerPage &&
                    -currentPage * resultPerPage <= 0
                  }
                  onClick={() => {
                    if (
                      categories?.length === resultPerPage &&
                      filteredCategoryCount - currentPage * resultPerPage > 0
                    ) {
                      localStorage.setItem("all-categories", currentPage + 1);
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="create-modal"
        tabIndex="-1"
        aria-labelledby="create-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="create-modal-label">
                Create Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="create-name">
                Name: <span className="text-danger">*</span>
              </label>
              <input
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                required
                type="text"
                className="form-control"
                id="create-name"
              />
              <label htmlFor="create-des">
                Description: <span className="text-danger">*</span>
              </label>
              <textarea
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                required
                rows="4"
                className="form-control"
              ></textarea>
              <label htmlFor="create-parent">Select Parent:</label>
              <select
                value={newCategory.parent}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, parent: e.target.value })
                }
                className="form-select"
                id="create-parent"
                defaultValue=""
              >
                <option value="">Chose Category</option>
                {categories &&
                  categories.map((item) => {
                    return <option value={item?._id}>{item?.name}</option>;
                  })}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-submit btn-primary"
                onClick={handleCreate}
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="edit-modal"
        tabIndex="-1"
        aria-labelledby="edit-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="edit-modal-label">
                Edit Category
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="create-name">
                Name: <span className="text-danger">*</span>
              </label>
              <input
                required
                value={selectedItem?.name}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, name: e.target.value })
                }
                type="text"
                className="form-control"
                id="create-name"
              />
              <label htmlFor="create-des">
                Description: <span className="text-danger">*</span>
              </label>
              <textarea
                required
                value={selectedItem?.description}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    description: e.target.value,
                  })
                }
                rows="4"
                className="form-control"
              ></textarea>
              <label htmlFor="create-parent">Select Parent:</label>
              <select
                value={selectedItem?.parent?._id}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, parent: e.target.value })
                }
                className="form-select"
                id="create-parent"
                defaultValue=""
              >
                <option value="">Chose Category</option>
                {categories &&
                  categories.map((item) => {
                    if (item._id !== selectedItem?._id)
                      return <option value={item?._id}>{item?.name}</option>;
                  })}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseEditModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm btn-submit btn-primary"
                data-bs-dismiss="modal"
                onClick={handleEdit}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesManagement;
