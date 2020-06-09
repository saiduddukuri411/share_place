import React from "react";
import "../styles/button.scss";
import { useHistory } from "react-router-dom";
import { BdFilter } from "../../../Usercontext";

const Button = ({
  btn_text,
  isValid,
  signup,
  values,
  sl,
  se,
  ss,
  profile,
  image_id
}) => {
  const { setli, setuid, setToken,setTokenExp } = React.useContext(BdFilter);
  const history = useHistory();
  const LoginHandler = async (event) => {
    sl((prev) => true);
    if (signup) {
      try {
        se((prev) => null);
        ss(() => false);
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("name", values.user);
        formData.append("password", values.password);
        formData.append("image", profile);
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/users/signup", {
          method: "POST",
          body: formData, //with form data no need to det headers
        });

        const response_data = await response.json();
        if (!response.ok) {
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
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+"/users/login", {
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
        if (!response.ok) {
          throw new Error(response_data.message);
        }
        sl((prev) => false);
        setli((prev) => true);
        setuid((prev) => response_data.userId);
        setToken((prev) => response_data.token);
        const tokenExpirationDate=new Date(new Date().getTime()+1000*60*60);
        setTokenExp((prev)=>tokenExpirationDate);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: response_data.userId,
            token: response_data.token,
            expiration:tokenExpirationDate.toISOString()
          })
        );
        history.push("/");
      } catch (err) {
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
