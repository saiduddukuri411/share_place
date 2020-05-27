import React from "react";
import "../styles/imageCard.scss";
// import {GrLocation} from 'react-icons/gr';
import { MdLocationOff, MdDelete, MdEdit } from "react-icons/md";
import Backdrop from "../../Backdop/backdrop";
import { BdFilter, MdFilter } from "../../../Usercontext";
import Model from "../../Backdop/model";
import { Link } from "react-router-dom";

export const ImageCard = ({ url, name, details }) => {
  const { setbd,li } = React.useContext(BdFilter);
  const { setmd, setti, setmp, setdetails, de, setde } = React.useContext(
    MdFilter
  );
  return (
    <>
      <div className="place_container">
        <section className="image_section">
          <img src={url} alt="place" />
        </section>
        <h3>{name}</h3>
        <h4>
          <span
            onClick={() => {
              setbd((prev) => true);
              setmp((prev) => false);
              setde((prev) => false);
              setmd((prev) => true);
              setti((prev) => name);
              setdetails(details);
            }}
          >
            +About
          </span>
        </h4>
        <div class={li?"icon-holder":"icon-holder  justify_center"}>
          <MdLocationOff
            className="map-icons"
            onClick={() => {
              setbd((prev) => !prev);
              setmd((prev) => !prev);
              setti((prev) => name);
              setmp((prev) => true);
              setde((prev) => false);
              setdetails(details);
            }}
          />
          {li?<Link to={`/places/${details.id}`} style={{ textDecoration: "none" }}>
            <MdEdit className="edit-icons" />
          </Link>:null}
          
          {li?<MdDelete
            className="delete-icons"
            onClick={() => {
              console.log('delete')
              setbd((prev) => true);
              setmp((prev) => false);
              setde((prev) => true);
              setmd((prev) => true);
              setti((prev) => name);
              setdetails(details);
            }}
          />:null}
          
        </div>
      </div>
    </>
  );
};
export default ImageCard;
