import React from "react";
import "./styles/frame.scss";
import { Places, url } from "./components/userPlacedata";
import Notfound from "../NotFound/notFound";
import { Link } from "react-router-dom";
import ImgCard from "./components/imageCard";
import { BdFilter, MdFilter } from "../../Usercontext";
import Backdrop from "../Backdop/backdrop";
import Sidedrawer from "../Backdop/Sidedrawer";
import Model from "../Backdop/model";

const Userplace = (props) => {
  const id = props.match.params.userId;
  const { bd } = React.useContext(BdFilter);
  const { md } = React.useContext(MdFilter);
  const data = Places.filter((place) => place.owner === id);
  console.log(bd, md);
  if (data.length === 0) {
    return (
      <>
        <div className="not-found">
          <Notfound text="PLACES NOT FOUND" />
          <Link to="/places/new" style={{ textDecoration: "none" }}>
            <h3>+ADD ONE</h3>
          </Link>
        </div>
        {bd ? <Backdrop /> : null};
        <Sidedrawer />;
      </>
    );
  }

  return (
    <>
      <section className="frame">
        <div className="frame-container">
          {data.map((place) => {
            return (
              <ImgCard
                key={place.id}
                url={place.url}
                name={place.title}
                details={{description:place.description,lat:place.location.lat,lng:place.location.lng,id:place.id}}
              />
            );
          })}
        </div>
      </section>
      {bd ? <Backdrop /> : null};{md ? <Model /> : null};
      <Sidedrawer />
    </>
  );
};
export default Userplace;
