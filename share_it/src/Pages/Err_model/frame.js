import React from "react";
import "./styles/frame.scss";
import {Link} from 'react-router-dom';

const Err_modal = ({ err, fun, title ,btn }) => {
  return (
    <>
      <section className="frame_container"></section>
      <div className="model_container">
        <div className="errModel">
          <div className="header">
            <h6>{title}</h6>
          </div>
          <div className="model_content">
            <h6>{err}</h6>
            {btn==="okay"?<div
              className="model_btn"
              onClick={() => {
                fun();
              }}
            >
              <h6>{btn}</h6>
            </div>:<Link to='/' style={{textDecoration:"none"}} ><div
              className="model_btn"
            >
              <h6>{btn}</h6>
            </div></Link>}
          </div>
        </div>
      </div>
    </>
  );
};
export default Err_modal;
