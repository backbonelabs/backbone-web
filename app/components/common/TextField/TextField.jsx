import React, { Component, PropTypes } from 'react';
import Input from 'muicss/lib/react/input';
import Select from 'muicss/lib/react/select';
import './TextField.scss';

class TextField extends Component {
  static propTypes = {
    fieldType: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    errorStyle: PropTypes.string,
    children: PropTypes.node,
  }

  componentDidMount() {
    const { fieldType, disabled } = this.props;
    if ((fieldType === 'select') && (disabled)) {
      this.selectFieldRef.refs.selectEl.setAttribute('disabled', true);
    }
  }

  render() {
    let elementType = null;
    const {
      fieldType,
      disabled,
      errorText,
      ...otherProps
    } = this.props;

    if (fieldType === 'input') {
      elementType = (
        <Input
          {...otherProps}
          disabled={disabled}
        />
      );
    }

    if (fieldType === 'select') {
      elementType = (
        <Select
          ref={ref => this.selectFieldRef = ref} // eslint-disable-line
          {...otherProps}
        >{this.props.children}</Select>
      );
    }

    if (this.selectFieldRef) {
      if (disabled) {
        this.selectFieldRef.refs.selectEl.setAttribute('disabled', true);
      } else {
        this.selectFieldRef.refs.selectEl.removeAttribute('disabled');
      }
    }
    const errorStyle = errorText ? 'input-error' : '';
    return (
      <div className={`textField-wrapper ${errorStyle}`}>
        { elementType }
        <small>{errorText}</small>
      </div>
    );
  }
}

export default TextField;
