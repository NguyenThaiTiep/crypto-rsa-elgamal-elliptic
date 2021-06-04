import Button from "@material-ui/core/Button";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
export interface ElGamalProps {
  inputValues: InputItem[];
}
export interface InputItem {
  label: string;
  placeholder?: string;
  onChange: (value: any) => void;
  type?: string;
}
/**
p: number;
q: number;
x: number;
e: number; */
const InputElGamal = (props: ElGamalProps) => {
  const { inputValues } = props;
  return (
    <div className="input-rsa ">
      {inputValues.map((input, index) => (
        <InputContainer {...input} key={index} />
      ))}
      <div className="footer-input text-center">
        <div className="btn-options">
          <Button variant="outlined">Tạo mới</Button>
        </div>
        <div className="btn-options">
          <Button variant="outlined" color="primary">
            Tạo hệ mật
          </Button>
        </div>
        <div className="btn-options">
          <Button variant="outlined" color="primary">
            Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputElGamal;
