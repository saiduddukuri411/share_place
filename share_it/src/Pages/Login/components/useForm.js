import { useState, useCallback } from "react";
import { validate } from "./vaidations";

const validationDict = {
  Email: [{ type: "EMAIL" }],
  Password: [{ type: "MINLENGTH", min: 5 }],
  Screen_Name: [
    { type: "MINLENGTH", min: 3 },
    { type: "MAXLENGTH", max: 9 },
  ],
};
export const useForm = ({ initialState, validations }) => {
  const [values, setValue] = useState(initialState);
  const [validation, setValidation] = useState(validations);

  const handler = useCallback((event) => {
    const value = event.target.value;
    const name = event.target.name;
    const list = validationDict[event.target.placeholder];
    const isValid = validate(list, value);
    setValue((prev) => {
      return { ...prev, [name]: value };
    });
    setValidation((prev) => {
      return {
        ...prev,
        [name]: isValid,
      };
    });
  }, []);

  return [values, validation, handler];
};
