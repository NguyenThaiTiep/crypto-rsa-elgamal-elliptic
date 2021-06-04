import Button from "@material-ui/core/Button";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import InputContainer from "../../../form-input/inputContainer";
import "./style.scss";
export interface RSAProps {
  inputValues: InputItem[];
  reNew?: () => void;
}
export interface InputItem {
  label: string;
  placeholder?: string;
  onChange: (value: any) => void;
  type?: string;
  value?: any;
  validator?: (value?: any) => boolean;
  message?: string;
}
/**
p: number;
q: number;
x: number;
e: number; */
const InputRSA = (props: RSAProps) => {
  const { inputValues } = props;
  return (
    <div className="input-rsa ">
      {inputValues.map((input, index) => (
        <InputContainer {...input} key={index} />
      ))}
      <div className="footer-input text-center">
        <div className="btn-options">
          <Button variant="outlined" onClick={props?.reNew}>
            Tạo mới
          </Button>
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
        <div className="btn-options">
          <Button variant="outlined" color="secondary">
            Tạo P,Q
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputRSA;
