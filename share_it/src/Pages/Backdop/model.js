import React, { useRef } from "react";
import { BdFilter, MdFilter } from "../../Usercontext";
import { useHttpHook } from "../Hooks/httpHook";
import Errormodel from "../Err_model/frame";
import Loader from "../Loading/frame";
// import {CSSTransition} from 'react-transition-group';
// import {IoMdCloseCircleOutline} from 'react-icons/io';
import "./styles/model.scss";

export const Model = ({ center, zoom }) => {
  //const google_map=new window.google.maps.Map();
  const { isLoading, error, senRequest, clearError } = useHttpHook();
  const { setbd,token } = React.useContext(BdFilter);
  const { setmd, md, ti, mp, details, de } = React.useContext(MdFilter);
  

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

  const deleteHandler = async () => {
    try {
      const res= await senRequest(
        `http://localhost:5000/api/places/${details.id}`,
        "DELETE",
         null,
         {
           Authorization:`Barer ${token}`
         }
      );
      if(res){
        details.fun(details.id);
      }
      
    } catch (e) {}
  };
  
  return (
    <>
      <section className="model">
        <div className="model-container">
          <div className="title">
            <h1>{ti}</h1>
          </div>
          {mp ? <h2>The Map!</h2> : null}
          <div class="map_container">
            {mp ? (
              <div ref={map_ref} className="map_content"></div>
            ) : de ? (
              <div className="delete_container">
                <h1>ARE YOU SURE?</h1>
                <div className="delete_content">
                  <h2>
                    Do you want to proceed and delete this place? Please note
                    that it can't be undone thereafter.
                  </h2>
                </div>
                <div className="buttons_handler">
                  <div className="cancel_btn" onClick={trigger}>
                    <h2>CANCEL</h2>
                  </div>
                  <div className="delete_btn" onClick={deleteHandler}>
                    <h2>DELETE</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="about_content">
                <h1>ABOUT!</h1>
                <div className="desc-container">
                  <h2>{details.description}</h2>
                </div>
              </div>
            )}
          </div>
          {de ? null : (
            <div class="cls_btn_holder">
              <div class="btn" onClick={trigger}>
                <h2>CLOSE</h2>
              </div>
            </div>
          )}
        </div>
      </section>
      {isLoading ? <Loader /> : null}
      {error ? (
        <Errormodel
          err={error}
          title="An Error Occured!"
          fun={()=>{

          }}
          path="/myplaces"
          btn="My Places"
        />
      ) : null}
    </>
  );
};

export default Model;
