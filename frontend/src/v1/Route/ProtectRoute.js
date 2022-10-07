import React from "react";
import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom";


const ProtectRoute = ({isAdmin, children}) => {
    const {isLoading, isAuthenticated, user} = useSelector((state) => state.user);
    console.log(isAuthenticated);
    if(isLoading) {
        return;
    }
    if(isAuthenticated === false) {
        return <Navigate replace to="/login" />
    }
    if(isAdmin === true && user.role !== "admin") {
        return <Navigate replace to="/login" />
    }
    return  children;
//     return (
//     <React.Fragment>
//         {isLoading ===false && <Route {...rest} 
//             element={(props) => {
//                 if(isAuthenticated === false) {
//                     return <Navigate replace to="/login" />
//                 }
//                 if(isAdmin === true && user.role !== "admin") {
//                     return <Navigate replace to="/login" />
//                 }
//                 return <Component {...props} />
//             }}
//          />}
//     </React.Fragment>
//   )
}

export default ProtectRoute