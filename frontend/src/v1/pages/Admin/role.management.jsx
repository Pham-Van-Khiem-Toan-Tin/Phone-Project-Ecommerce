import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { toast } from "react-toastify";

import "react-tabs/style/react-tabs.css";
import "./role-management.css";
import { clearError } from "../../reduxToolkit/reducer/role/role.slice";
import { getRoleList } from "../../reduxToolkit/actions/role.actions";

const RoleManagement = ({ ChildrenComponent }) => {
  const dispatch = useDispatch();
  const { roles, error, isLoading } = useSelector((state) => state.role);
  const [processedRoles, setProcessedRoles] = useState([]);
  const [listUpdate, setListUpdate] = useState([]);
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
    setListUpdate((preListUpdate) => {
      return (
        Array.isArray(preListUpdate) &&
        preListUpdate.map((list) => {
          
        })
      )
    })
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
    <div className="role-management">
      <div className="row">
        <div className="col-3">
          <ChildrenComponent />
        </div>
        <div
          className="col-9 pt-5 px-5 role-tabs"
          style={{ minHeight: "100vh" }}
        >
          <Tabs>
            <TabList>
              {processedRoles &&
                processedRoles.map((role) => {
                  return <Tab key={role?.role}>{role?.role}</Tab>;
                })}
            </TabList>
            {processedRoles &&
              processedRoles.map((role) => {
                return (
                  <TabPanel>
                    <Tabs className={"row"}>
                      <TabList className={"function col-3 d-flex flex-column"}>
                        {role?.functions &&
                          role?.functions.map((fun) => {
                            return <Tab>{fun?.function_name}</Tab>;
                          })}
                      </TabList>
                      <div className="col-9 rounded sub-list">
                        {role?.functions &&
                          role?.functions.map((fun) => {
                            return (
                              <TabPanel>
                                {fun.subList.map((sf) => {
                                  return (
                                    <div className="sub-function">
                                      <input
                                        type="checkbox"
                                        checked={fun.include.includes(sf)}
                                        value={sf}
                                        id={sf}
                                        onChange={() => {
                                          handleChangeSubFunction(
                                            role.role,
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
                  </TabPanel>
                );
              })}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
