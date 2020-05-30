import React from "react";
import "./styles/frame.scss";

const LoadingFrame = () => {
  return (
    <section className="loader_container">
      <div className="spinner">
      <div class="loader"></div>
      </div>
    </section>
  );
};

export default LoadingFrame;
