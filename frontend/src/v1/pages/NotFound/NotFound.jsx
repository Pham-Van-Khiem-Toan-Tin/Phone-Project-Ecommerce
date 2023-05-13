import React from "react";
const NotFound = () => {
  return (
    <div
      className="not-found"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h3 style={{ textAlign: "center", color: "#fff" }}>Page Not Found</h3>
    </div>
  );
};
export default NotFound;
