import React from "react";

function AppLoader() {
  return (
    <div
      className="spinner"
      style={{
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #007bff",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        zIndex: 1,
      }}
    ></div>
  );
}

export default AppLoader;
