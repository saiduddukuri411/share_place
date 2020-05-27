import React from "react";
import "../styles/input.scss";
import { FaUserCheck } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
const Inputbox = ({
  placeholder,
  error,
  category,
  value,
  handler,
  isValid,
}) => {
  const [blur, setblur] = React.useState(false);
  const [passhide, setpass] = React.useState(true);
  const passHandler = () => {
    setpass((prev) => !prev);
  };

  return (
    <>
      <div className="whole_width">
        <div className="user_box">
          {category === "email" ? (
            <MdEmail className="user_icon" />
          ) : category === "password" ? (
            <RiLockPasswordLine className="user_icon" />
          ) : (
            <FaUserCheck className="user_icon" />
          )}
          <div className="username_container">
            <input
              className="input"
              placeholder={placeholder}
              vlaue={value}
              onChange={handler}
              name={category}
              onBlur={() => {
                setblur((prev) => true);
              }}
              type={
                category !== "password"
                  ? "text"
                  : passhide
                  ? "password"
                  : "text"
              }
            ></input>
          </div>
          {category != "password" ? null : passhide ? (
            <IoMdEyeOff className="eye" onClick={passHandler} />
          ) : (
            <IoMdEye className="eye" onClick={passHandler} />
          )}
        </div>
      </div>
      {!blur ? null : isValid ? null : (
        <div className="error_container">
          <div className="error">
            <h5>{error}</h5>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Inputbox);
