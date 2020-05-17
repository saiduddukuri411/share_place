import React from "react";
import Backdrop from "../Backdop/backdrop";
import Sidedrawer from "../Backdop/Sidedrawer";
import { BdFilter } from "../../Usercontext";
import Input from "./components/input";
import "./styles/frame.scss";

const reducer=(state,action)=>{
  switch(action.type){
    case '0':
      return {...state,title:action.vali};
    case '1':
      return {...state,desc:action.vali}
    case '2':
      return {...state,add:action.vali}
   default:
     return state;
  }
}
const Frame = () => {
  const { bd } = React.useContext(BdFilter);
  
  const [overallState,dispatcher]=React.useReducer(reducer,{
    title:false,
    desc:false,
    add:false
  })
  
  
  const validate_function = React.useCallback((id, validation) => {
     dispatcher({
       type:id,
       vali:validation
     })
    
  });
  const list_validator=()=>{
     let valid=overallState.title && overallState.desc && overallState.add;
     return valid
  }
  
  return (
    <>
      <div className="form_container">
        <form className="form">
          <Input
            label="Title"
            id="0"
            type="input"
            element="input"
            placeholder="place name"
            validators={[{ type: "REQUIRE" }]}
            validation_error="Empty field"
            onInput={validate_function}
          />
          <Input
            label="Description"
            id="1"
            type="input"
            element="text_area"
            placeholder="Tell something about this place"
            validators={[
              { type: "MINLENGTH", val: 25 },
              { type: "MAXLENGTH", val: 300 },
            ]}
            validation_error="Describe in 20 to 350 charecters"
            onInput={validate_function}
          />
          <Input
            label="Address"
            id="2"
            type="input"
            element="input"
            placeholder="address"
            validators={[{ type: "REQUIRE" }]}
            validation_error="Invalid address"
            onInput={validate_function}
          />
          {list_validator() ? (
            <div className="submit">
              <h3>ADD</h3>
            </div>
          ) : null}
        </form>
      </div>
      {bd ? <Backdrop /> : null}
      <Sidedrawer />
    </>
  );
};

export default Frame;
