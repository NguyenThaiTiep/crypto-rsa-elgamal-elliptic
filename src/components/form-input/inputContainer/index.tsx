import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { InputItem } from "../../RSA/buildCrypto/input";
import "./style.scss";
const InputContainer = (props: InputItem) => {
  const [isValid, setIsValid] = useState(true);

  const change = (event: any) => {
    props.onChange && props.onChange(event.target.value);
    if (props.validator) {
      setIsValid(props.validator(event.target.value));
    }
  };

  return (
    <div className="mb-3">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">{props.label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={props.placeholder || "input here"}
          onChange={change}
          type={props.type || "text"}
          value={props.value || ""}

          // formNoValidate
        />
      </InputGroup>
      {!isValid && props.message && (
        <div className="error-input">
          <span className="error-text">(Error) : </span>
          <span>{props.message}</span>
        </div>
      )}
    </div>
  );
};

export default InputContainer;
