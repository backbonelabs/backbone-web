import React, { Component, PropTypes } from "react";
import Select from "muicss/lib/react/select";
import "./fields.css";

class SelectField extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    children: PropTypes.node
  };

  componentDidMount() {
    if (this.props.disabled) {
      this.selectFieldRef.refs.selectEl.disabled = true;
    }
  }

  render() {
    const { disabled, errorText, ...otherProps } = this.props;
    const errorStyle = errorText ? "input-error" : "";

    if (this.selectFieldRef) {
      if (disabled) {
        this.selectFieldRef.refs.selectEl.disabled = true;
      } else {
        this.selectFieldRef.refs.selectEl.removeAttribute("disabled");
      }
    }

    return (
      <div className={`field-container ${errorStyle}`}>
        <Select
          ref={ref => this.selectFieldRef = ref} // eslint-disable-line
          {...otherProps}
        >
          {this.props.children}
        </Select>
        <small>{errorText}</small>
      </div>
    );
  }
}

export default SelectField;
