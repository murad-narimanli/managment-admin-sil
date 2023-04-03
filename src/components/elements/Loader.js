import React from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="loaderFixed">
      <div className="loader"></div>
    </div>,
    document.querySelector("#loader")
  );
};

export default Loader;