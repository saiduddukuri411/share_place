import React from "react";
import "../styles/button.scss";
import { useHistory } from "react-router-dom";
import { BdFilter } from "../../../Usercontext";

const Button = ({ btn_text, isValid, signup, values, sl, se, ss }) => {
  const { setli,setuid } = React.useContext(BdFilter);
  const history = useHistory();
  const LoginHandler = async (event) => {
    sl((prev) => true);
    if (signup) {
      
      try {
        
        se((prev) => null);
        ss(() => false);
          const response = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              name: values.user,
              email: values.email,
              password: values.password,
            }),
          });
          

          const response_data = await response.json();
          if (!response.ok){
            throw new Error(response_data.message);
         }
        sl((prev) => false);
        ss((prev) => true);
      } catch (err) {
        sl((prev) => false);
        se(err.message || "something went wrong, try again");
      }

      return;
    } else {
      try{
        const response= await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });
          const response_data = await response.json();
          if (!response.ok){
            throw new Error(response_data.message);
         }
        sl((prev) => false);
        setli((prev) => true);
        setuid((prev)=>response_data.user.id)
        history.push("/");

      }catch(err){
        sl((prev) => false);
        se(err.message || "something went wrong, try again");
      }

      
    }
  };
  return (
    <div className="whole_div">
      <div className="button_div" onClick={LoginHandler}>
        <h2 className="btn_txt">{btn_text}</h2>
      </div>
      <div
        className={isValid() ? "hidebutton display_none" : "hidebutton"}
      ></div>
    </div>
  );
};
export default Button;
