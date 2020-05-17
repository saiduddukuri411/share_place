import React from "react";
import "./styles/backdrop.scss";
import { BdFilter } from "../../Usercontext";
const Backdrop = () => {
  const { setbd,setsd,sd } = React.useContext(BdFilter);
  return (
    <div
      className="backdrop"
      onClick={(bd) => {
        
        if(sd){
            setsd((prev) => !prev);  
        }
        setbd((prev) => !prev);
      }}
    ></div>
  );
};
export default Backdrop;
