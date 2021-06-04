import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { InputItem } from "../../RSA/buildCrypto/input";

const InputContainer = (props: InputItem) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">{props.label}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={props.placeholder || "input here"}
        onChange={props.onChange}
        type={props.type || "text"}
        formNoValidate
      />
    </InputGroup>
  );
};

export default InputContainer;
