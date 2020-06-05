import React from "react";
import "../styles/input.scss";
import { validator } from "../components/validations";

const Input = React.memo(
  ({
    label,
    category,
    error,
    placeholder,
    handler,
    name, 
    value,
    validations,
    validhandler,
    executer
  }) => {
    const isValid = validator(validations, value);
    const [isFocused, setfocused] = React.useState(false);
    const getOut = () => {
      setfocused((prev) => true);
    };
    React.useEffect(() => {
      validhandler(name,isValid)
    }, [isFocused, value]);
    const element =
      category === "input" ? (
        <input
          className={isValid ? "input" : isFocused ? "input red" : "input"}
          placeholder={placeholder}
          name={name}
          onBlur={getOut}
          value={value}
          onChange={(e)=>{
            handler(e);
            executer();
          }}
        />
      ) : (
        <textarea
          className={
            isValid ? "text_area" : isFocused ? "text_area red" : "text_area"
          }
          placeholder={placeholder}
          value={value}
          onBlur={getOut}
          name={name}
          rows="3"
          onChange={(e)=>{
            handler(e);
            executer();
          }}
        />
      );
    return (
      <div className="Input_container">
        <h4>{label}</h4>
        {element}
        {isValid ? null : isFocused ? <p>{error}</p> : null}

      </div>
    );
  }
);

export default Input;
