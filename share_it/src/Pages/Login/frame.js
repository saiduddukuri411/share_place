import React from "react";
import "./styles/frame.scss";
import logo from "../images/login.svg";
import { FaUserCheck } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import Input from "./components/inputbox";
import Button from "./components/button";
import { useForm } from "./components/useForm";
import Sidedrawer from "../Backdop/Sidedrawer";
import Backdrop from "../Backdop/backdrop";
import { BdFilter } from "../../Usercontext";
import Loader from "../Loading/frame";
import Imageupload from '../Imageholder/frame';
import Errmodel from "../Err_model/frame";

export const Frame = () => {
  const [values, validation, handler] = useForm({
    initialState: { email: "", password: "", user: "" },
    validations: { email: false, password: false, user: false },
  });
  const [isLoading, setIsloading] = React.useState(false);
  const [isError, setIsError] = React.useState(null);
  const [succSignup,setSignup]=React.useState(false);
  const errHandler = () => {
    setIsError((prev) => null);
  };
  const signupHandler=()=>{
    setSignup((prev)=>false)
  }
  const { bd } = React.useContext(BdFilter);
  const [singup, setsignup] = React.useState(false);
  const [profile,setProfile]=React.useState(null);
  const login = () => {
    return validation.email && validation.password;
  };
  const signup_fun = () => {
    return validation.email && validation.password && validation.user && profile;
  };
  return (
    <>
      <section className="login_container">
        <div className="avatar">
          <img src={logo} alt="avatar" />
        </div>
        <div className="form_title">
          <div className="login_holder">
            <h1>{singup ? "SignUp" : "LogIn"}</h1>
          </div>
        </div>
        <Input
          placeholder="Email"
          error="Invalid"
          category="email"
          value={values.email}
          handler={handler}
          isValid={validation.email}
        />
        {singup ? (
          <Input
            placeholder="Screen_Name"
            error="Use 3 to 9 letters"
            category="user"
            value={values.user}
            handler={handler}
            isValid={validation.user}
          />
        ) : null}
        <Input
          placeholder="Password"
          error="Atleast 5 letters"
          category="password"
          value={values.password}
          isValid={validation.password}
          handler={handler}
        />
        {singup?<Imageupload id="image" profile={setProfile}/>:null}

        <Button
          btn_text={singup ? "SignUp" : "Login"}
          isValid={singup ? signup_fun : login}
          signup={singup}
          values={values}
          sl={setIsloading}
          se={setIsError}
          ss={setSignup}
          profile={profile}
        />
        <div className="extra_holder">
          <div
            className={
              singup ? "extra_features justify_center" : "extra_features"
            }
          >
            <h2
              className="childs text_dec"
              onClick={() => {
                setsignup((prev) => !prev);
              }}
            >
              {singup ? "LogIn!" : "SignUp!"}
            </h2>
            {singup ? null : <h2 className="childs bar">|</h2>}

            {singup ? null : (
              <h2 className="childs text_dec">Forget Password?</h2>
            )}
          </div>
        </div>
      </section>
      {bd ? <Backdrop /> : null};{isLoading ? <Loader /> : null}
      {isError ? (
        <Errmodel err={isError} title="An Error Occured!" fun={errHandler} btn="okay" />
      ) : null}
      {succSignup?
      <Errmodel err="user successfully regestered , kindly go back and login." title="Successfully Registered" fun="" btn="Home" />:
      null
      }
      <Sidedrawer />
    </>
  );
};

export default Frame;
