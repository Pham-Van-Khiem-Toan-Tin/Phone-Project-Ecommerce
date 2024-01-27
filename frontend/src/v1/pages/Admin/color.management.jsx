import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./color-management.css";
import {

  getAllCategory,

} from "../../reduxToolkit/actions/category.action";
import { reset } from "../../reduxToolkit/reducer/category/category.slice";
import {
  createColor,
  getAllColor,
  updateColor,
} from "../../reduxToolkit/actions/color.action";
const ColorManagement = ({ SideBarComponent, HeaderComponent }) => {
  const { colors, resultPerPage, filteredColorCount, success, message } =
    useSelector((state) => state.color);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [newColor, setNewColor] = useState({
    name: "",
    description: "",
    hex: "#563d7c",
  });
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(getAllColor({ page: currentPage, key: keyWord.trim() }));
  };
  const handleSelectItemEdit = (item) => {
    setSelectedItem({ ...item });
  };
  const handleCloseEditModal = () => {
    setSelectedItem(null);
  };
  const handleCreate = () => {
    dispatch(
      createColor({
        name: newColor.name.trim(),
        description: newColor.description.trim(),
        hex: newColor.hex,
      })
    );
  };
  const handleEdit = () => {
    console.log("chay vao ham 1");
    console.log({selectedItem});
    dispatch(
      updateColor({
        name: selectedItem._id,
        description: selectedItem.description.trim(),
        hex: selectedItem.hex,
      })
    );
  };
  useEffect(() => {
    const storedCurrentPage = JSON.parse(localStorage.getItem("all-category"));
    setCurrentPage(storedCurrentPage || 1);
    if (success) {
      toast.success(message);
      dispatch(reset());
    }
    dispatch(getAllColor({ page: currentPage, key: keyWord.trim() }));
  }, [dispatch, currentPage, success]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="colors-management">
        <p className="title">Colors</p>
        <div className="d-flex align-items-center justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                color
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
        <div className="colors-list p-2 mt-2 rounded">
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
                  <th scope="col">Preview</th>
                  <th scope="col">Description</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {colors &&
                  colors.map((item) => {
                    return (
                      <tr>
                        <th scope="row">{item?._id}</th>
                        <td>
                          <div
                            style={{
                              width: "3rem",
                              height: "10px",
                              backgroundColor: item?.hex,
                            }}
                          ></div>
                        </td>
                        <td>{item?.description}</td>
                        <td>
                          {format(new Date(item?.createdAt), "dd/MM/yyyy")}
                        </td>
                        <td className="action">
                          <button
                            type="button"
                            className="btn btn-sm edit"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-modal"
                            onClick={() => handleSelectItemEdit(item)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm delete text-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#edit-modal"
                            onClick={() => handleSelectItemEdit(item)}
                          >
                            <FaTrashAlt />
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
                    colors?.length !== resultPerPage &&
                    -currentPage * resultPerPage <= 0
                  }
                  onClick={() => {
                    if (
                      colors?.length === resultPerPage &&
                      filteredColorCount - currentPage * resultPerPage > 0
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
                Create Color
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
                value={newColor.name}
                onChange={(e) =>
                  setNewColor({ ...newColor, name: e.target.value })
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
                value={newColor.description}
                onChange={(e) =>
                  setNewColor({
                    ...newColor,
                    description: e.target.value,
                  })
                }
                required
                rows="4"
                className="form-control"
              ></textarea>
              <label htmlFor="create-hex" className="form-label">
                Color Picker: <span className="text-danger">*</span>
              </label>
              <input
                type="color"
                className="form-control form-control-color"
                id="create-hex"
                value={newColor.hex}
                onChange={(e) =>
                  setNewColor({
                    ...newColor,
                    hex: e.target.value,
                  })
                }
                title="Choose your color"
              />
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
                Edit Color
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
                value={selectedItem?._id}
                disabled
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
              <label htmlFor="create-hex" className="form-label">
                Color Picker: <span className="text-danger">*</span>
              </label>
              <input
                type="color"
                className="form-control form-control-color"
                id="create-hex"
                value={selectedItem?.hex}
                onChange={(e) =>
                  setNewColor({
                    ...selectedItem,
                    hex: e.target.value,
                  })
                }
                title="Choose your color"
              />
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

export default ColorManagement;
