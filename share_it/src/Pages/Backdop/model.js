import React, { useRef } from "react";
import { BdFilter, MdFilter } from "../../Usercontext";
// import {CSSTransition} from 'react-transition-group';
// import {IoMdCloseCircleOutline} from 'react-icons/io';
import "./styles/model.scss";

export const Model = ({ center, zoom }) => {
  //const google_map=new window.google.maps.Map();
  const { setbd } = React.useContext(BdFilter);
  const { setmd, md, ti, mp, details } = React.useContext(MdFilter);

  console.log(details, details.lat, details.lng);
  const map_ref = useRef();

  const trigger = () => {
    setbd((prev) => false);
    setmd((prev) => false);
  };
  
  React.useEffect(() => {
    if (mp) {
      const google_map = new window.google.maps.Map(map_ref.current, {
        center: { lat: details.lat, lng: details.lng },
        zoom: 13,
      });
      new window.google.maps.Marker({
        position: { lat: details.lat, lng: details.lng },
        map: google_map,
      });
    }
  }, []);
  return (
    <section className="model">
      <div className="model-container">
        <div className="title">
          <h1>{ti}</h1>
        </div>
        {mp ? <h2>The Map!</h2> : null}
        <div class="map_container">
          {mp ? (
            <div ref={map_ref} className="map_content"></div>
          ) : (
            <div className="about_content">
              <h1>ABOUT!</h1>
              <div className="desc-container">
                <h2>{details.description}</h2>
              </div>
            </div>
          )}
        </div>
        <div class="cls_btn_holder">
          <div class="btn">
            <h2 onClick={trigger}>CLOSE</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
