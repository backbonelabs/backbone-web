import React, { PropTypes } from "react";
import Input from "muicss/lib/react/input";
import "./fields.css";

const TextField = ({ errorText, ...otherProps }) => {
  const errorStyle = errorText ? "input-error" : "";
  return (
    <div className={`field-container ${errorStyle}`}>
      <Input {...otherProps} />
      <small>{errorText}</small>
    </div>
  );
};

TextField.propTypes = {
  errorText: PropTypes.string
};

export default TextField;
