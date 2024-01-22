import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";
import _ from "lodash";
import "react-tabs/style/react-tabs.css";
import "./role-management.css";
import { clearError } from "../../reduxToolkit/reducer/role/role.slice";
import {
  getRoleList,
  updateRoleList,
} from "../../reduxToolkit/actions/role.actions";

const RoleCreate = ({ SideBarComponent, HeaderComponent }) => {
  const dispatch = useDispatch();
  const { roles, error, isLoading } = useSelector((state) => state.role);
  const [processedRoles, setProcessedRoles] = useState([]);
  const handleChangeSubFunction = (roleName, functionRole, subFunctionRole) => {
    setProcessedRoles((preRoles) => {
      return (
        Array.isArray(preRoles) &&
        preRoles.map((role) => {
          if (role.role === roleName) {
            return {
              ...role,
              functions: role.functions.map((f) => {
                if (f.function_name === functionRole.function_name) {
                  return {
                    ...f,
                    include: functionRole.include.includes(subFunctionRole)
                      ? f.include.filter((item) => item !== subFunctionRole)
                      : [...functionRole.include, subFunctionRole],
                  };
                }
                return f;
              }),
            };
          }
          return role;
        })
      );
    });
  };
  const handleSubmit = (e) => {
    if (_.isEqual(roles, processedRoles)) {
      toast.warning("you have not changed the data");
      return;
    }
    const changes = [];
    for (let i = 0; i < processedRoles.length; i++) {
      const originalRole = roles[i];
      const updatedRole = processedRoles[i];
      const includeDiff = _.difference(
        originalRole.functions.map((f) => f.include),
        updatedRole.functions.map((f) => f.include)
      );
      if (includeDiff.length > 0) {
        const roleChanges = {
          role: updatedRole.role,
          functions: [],
        };
        originalRole.functions.forEach((originalFunction) => {
          const updatedFunction = updatedRole.functions.find(
            (f) => f.function_name === originalFunction.function_name
          );
          if (updatedFunction) {
            const includeDiffFunction = _.isEqual(
              originalFunction.include,
              updatedFunction.include
            );
            if (!includeDiffFunction > 0) {
              roleChanges.functions.push({
                function_name: updatedFunction.function_name,
                include: updatedFunction.include,
              });
            }
          }
        });
        // Thêm vào danh sách thay đổi nếu có sự khác biệt
        if (roleChanges.functions.length > 0) {
          changes.push(roleChanges);
        }
      }
    }
    dispatch(updateRoleList(changes));
  };
  useEffect(() => {
    if (roles) {
      setProcessedRoles([...roles]);
    }
  }, [roles]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getRoleList());
  }, [dispatch, error]);

  return (
    <>
      <SideBarComponent />
      <HeaderComponent />
      <div className="role-management">
        <p className="title">Role</p>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <span className="fw-bold">Home</span>
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Role
              </li>
              <li className="breadcrumb-item" aria-current="page">
                Create
              </li>
            </ol>
          </nav>
        </div>
        <div className="new-role-name">
          <label htmlFor="role-name">Role Name: <span className="text-danger">*</span></label>
          <input type="text" className="form-control" id="role-name" />
        </div>
        {processedRoles && (
          <Tabs className={"row"}>
            <TabList className={"function col-3 d-flex flex-column"}>
              {processedRoles[0]?.functions &&
                processedRoles[0]?.functions.map((fun) => {
                  return <Tab>{fun?.function_name}</Tab>;
                })}
            </TabList>
            <div className="col-9 rounded sub-list">
              {processedRoles[0]?.functions &&
                processedRoles[0]?.functions.map((fun) => {
                  return (
                    <TabPanel>
                      {fun.subList.map((sf) => {
                        return (
                          <div className="sub-function">
                            <input
                              type="checkbox"
                              checked={false}
                              value={sf}
                              id={sf}
                              disabled={false}
                              onChange={() => {
                                handleChangeSubFunction(
                                  processedRoles[0].role,
                                  fun,
                                  sf
                                );
                              }}
                            />
                            <label htmlFor={sf}>{sf}</label>
                          </div>
                        );
                      })}
                    </TabPanel>
                  );
                })}
            </div>
          </Tabs>
        )}

        <div className="d-flex justify-content-end gap-3 mt-3">
          <button onClick={handleSubmit} className="btn btn-sm btn-primary">
            Save
          </button>
          <button className="btn btn-sm btn-primary">Return</button>
        </div>
      </div>
    </>
  );
};

export default RoleCreate;
