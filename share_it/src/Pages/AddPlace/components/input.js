import React from "react";
import "../styles/input.scss";
import { validate } from "./validations";

const inputReducer = (state, action) => {
  // console.log('sai',validate(action.val,action.validators),action.val.trim().length>0)
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isBlur: false,
        isValid: validate(action.val, action.validators),
      };
    case "FOCUS":
      return {
        ...state,
        isBlur: true,
      };
    default:
      return state;
  }
};

export const Input = ({
  label,
  id,
  element,
  type,
  placeholder,
  rows,
  validation_error,
  validators,
  onInput
}) => {
  
  const [inputState, dispatch] = React.useReducer(inputReducer, {
    value: "",
    isValid: false,
    isBlur: false,
  });
  React.useEffect(()=>{
    onInput(id,inputState.isValid)
  },[inputState.isValid])
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: validators,
    });
  };
  const blurHandler = () => {
    dispatch({ type: "FOCUS" });
  };
  const division =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={
          inputState.isValid && inputState.isBlur
            ? "input_area"
            : inputState.isBlur
            ? "input_area red_border"
            : "input_area"
        }
        value={inputState.value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    ) : (
      <textarea
        className={
          inputState.isValid && inputState.isBlur
            ? "text_area"
            : inputState.isBlur
            ? "text_area red_border"
            : "text_area"
        }
        placeholder={placeholder}
        id={id}
        rows={rows || 3}
        value={inputState.value}
        onBlur={blurHandler}
        onChange={changeHandler}
      />
    );
  return (
    <div className="input_container">
      <label htmlFor={id} className="label">
        {label}
      </label>
      {division}
      {inputState.isValid ? null : inputState.isBlur ? (
        <p className="error  ">{validation_error}</p>
      ) : null}
    </div>
  );
};

export default React.memo(Input);
