import React from "react";
import styles from "./styles.module.css";

const Input = ({label, type, name, placeholder}) => {
  return (
    <div>
      <label>
        {label}
        <br></br>
        <input type={type} name={name} placeholder={placeholder}/>
      </label>
    </div>
  );
};

export default Input;
