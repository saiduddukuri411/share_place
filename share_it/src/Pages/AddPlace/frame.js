import React from "react";
import Backdrop from "../Backdop/backdrop";
import Sidedrawer from "../Backdop/Sidedrawer";
import { BdFilter } from "../../Usercontext";
import Input from "./components/input";
import "./styles/frame.scss";
import {useHttpHook} from '../Hooks/httpHook.js';
import Errmodel from '../Err_model/frame';
import Loader from '../Loading/frame';
import {useHistory} from 'react-router-dom'
import Imageholder from '../Imageholder/frame';


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
  const { isLoading, error, senRequest, clearError } = useHttpHook();
  const { bd,uid ,token} = React.useContext(BdFilter);
  const [inputs,setInputs]=React.useState({0:'',1:'',2:''})
  const [success,setsuccess]=React.useState(false)
  const [profile,setprofile]=React.useState(null)
  const GoHome=()=>{
    const history=useHistory();
    history.push('/');
  }
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
     let valid=overallState.title && overallState.desc && overallState.add && profile!==null;
     return valid
  }

  const addHandler=async ()=>{
    const formData=new FormData();
    formData.append('title',inputs[0]);
    formData.append('description',inputs[1]);
    formData.append('address',inputs[2]);
    formData.append('owner',uid);
    formData.append('image',profile);
    try{
      const resp=await senRequest(process.env.REACT_APP_BACKEND_URL+'/places/','POST',formData,{
        Authorization:`Bearer ${token}`,
      },
      )
      if(resp){
        setsuccess(true)
      }
     
     
    //  redirect the user to different page
    }catch(err){
    }
    
    
 }
 
  
  return (
    <>
      <div className="form_container">
        <form className="form" onSubmit={(e)=>{e.preventDefault();}}>
          <Input
            label="Title"
            id="0"
            type="input"
            element="input"
            placeholder="place name"
            validators={[{ type: "REQUIRE" },{ type: "MAXLENGTH", val: 16 }]}
            validation_error="Name in 1 to 16 charecters"
            onInput={validate_function}
            setter={setInputs}
            inputs={inputs}
          />
          <Input
            label="Description"
            id="1"
            type="input"
            element="text_area"
            placeholder="Tell something about this place"
            validators={[
              { type: "MINLENGTH", val: 25 },
              { type: "MAXLENGTH", val: 450 },
            ]}
            validation_error="Describe in 20 to 450 charecters"
            onInput={validate_function}
            setter={setInputs}
            inputs={inputs}
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
            setter={setInputs}
            inputs={inputs}
          />
          <Imageholder id="image" profile={setprofile}/>
          {list_validator() ? (
            <div className="submit" onClick={addHandler}>
              <h3>ADD</h3>
            </div>
          ) : null}
        </form>
      </div>
      {bd ? <Backdrop /> : null}
      <Sidedrawer />
      {isLoading?<Loader />:null}
      {error?<Errmodel err={error} title="An Error Occured!" fun={clearError} btn="okay"/>:null}
      {success?<Errmodel err="Added your desired location successfull" title="Successfully Added" fun={()=>{}} path="/myplaces" btn="My Places"/>:null}
    </>
  );
};

export default Frame;
