import React from "react";
import "../styles/button.scss";
import {useHistory} from 'react-router-dom'
import {BdFilter} from '../../../Usercontext';

const Button = ({ btn_text,isValid,signup }) => {
  const { setli } = React.useContext(BdFilter);
  const history=useHistory()
  const LoginHandler=()=>{
    if(signup){
        return
    }else{
      setli((prev)=>true)
      history.push('/')
    }
  }
  return (
    <div className="whole_div">
      <div className="button_div" onClick={LoginHandler}>
        <h2 className="btn_txt">{btn_text}</h2>
      </div>
      <div className={isValid()?"hidebutton display_none":"hidebutton"}>
      </div>
    </div>
  );
};
export default Button;
