import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import { red500, grey900 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
// import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import constants from '../../utils/constants';
import Form from '../common/Form/Form';
import './Profile.scss';

const { heightValuesIn, heightValuesCm, weightValuesLb, weightValuesKg } = constants;

class Profile extends Component {

  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.object,
    }),
  }
  constructor(props) {
    super(props);

    const { user } = this.props.auth;

    this.state = {
      nickName: user.nickname,
      gender: user.gender,
      height: user.height,
      heightUnit: user.heightUnitPreference,
      weight: user.weight,
      weightUnit: user.weightUnitPreference,
      email: user.email,
      date: user.birthdate ? new Date(user.birthdate) : null,
      disableForm: true,
    };
  }

  @autobind
  onNicknameChange(evt) {
    this.setState({ nickName: evt.target.value });
  }

  @autobind
  onEmailChange(evt) {
    this.setState({ email: evt.target.value });
  }

  @autobind
  onDateChange(evt, date) {
    this.setState({ date });
  }

  @autobind
  onGenderChange(evt, idx, value) {
    this.setState({ gender: value });
  }

  @autobind
  onHeightChange(evt, idx, value) {
    this.setState({ height: value });
  }

  @autobind
  onHeightUnitChange(evt, idx, value) {
    const stateChanges = {
      heightUnit: value,
    };

    if (this.state.heightUnit === 1) { // if unit is in
      stateChanges.height = Math.round(this.state.height * 2.54);
    }

    if (this.state.heightUnit === 2) { // if unit is cm
      stateChanges.height = Math.max(1, Math.round(this.state.height / 2.54));
    }

    this.setState(stateChanges);
  }

  @autobind
  onWeightChange(evt, idx, value) {
    this.setState({ weight: value });
  }

  @autobind
  onWeightUnitChange(evt, idx, value) {
    const stateChanges = {
      weightUnit: value,
    };

    if (this.state.weightUnit === 1) { // if unit is LB
      stateChanges.weight = Math.ceil(this.state.weight * 0.453592);
    }

    if (this.state.weightUnit === 2) { // if unit is kg
      stateChanges.weight = Math.round(this.state.weight / 0.453592);
    }

    this.setState(stateChanges);
  }

  @autobind
  editForm() {
    this.setState({ disableForm: !this.state.disableForm });
  }

  render() {
    const heightInches = heightValuesIn.map(val => (
      <MenuItem key={val} value={val} primaryText={`${Math.floor(val / 12)}ft ${val % 12}in`} />
    ));

    const heightCentimeter = heightValuesCm.map(val => (
      <MenuItem key={val} value={val} primaryText={val} />
    ));

    const weightPounds = weightValuesLb.map(val => (
      <MenuItem key={val} value={val} primaryText={val} />
    ));

    const weightkilograms = weightValuesKg.map(val => (
      <MenuItem key={val} value={val} primaryText={val} />
    ));

    return (
      <div className="profile-container">
        <div className="profile-container__content-wrapper">
          <div className="profile-container__header">
            <h1>Profile</h1>
            <RaisedButton
              label={this.state.disableForm ? 'Edit' : 'Cancel'}
              backgroundColor={grey900}
              labelColor="#FFF"
              onClick={this.editForm}
            />
            <RaisedButton
              className="profile-container__saveBtn"
              label="Save changes"
              backgroundColor={red500}
              labelColor="#FFF"
            />
          </div>
          <Form className="profile-container__form">
            <TextField
              className="profile-container__textfield"
              floatingLabelText="Nickname"
              underlineShow={false}
              value={this.state.nickName}
              onChange={this.onNicknameChange}
              floatingLabelFocusStyle={{ color: grey900 }}
              disabled={this.state.disableForm}
            />
            <Divider />
            <SelectField
              className="profile-container__selectfield"
              floatingLabelText="Gender"
              floatingLabelFocusStyle={{ color: grey900 }}
              value={this.state.gender}
              onChange={this.onGenderChange}
              underlineShow={false}
              name="gender"
              disabled={this.state.disableForm}
            >
              <MenuItem value={2} primaryText="Female" />
              <MenuItem value={1} primaryText="Male" />
            </SelectField>
            <Divider />
            <div className="profile-container__selectfield">
              <SelectField
                className="profile-container__leftside-selectfield"
                floatingLabelText="Height"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.height}
                onChange={this.onHeightChange}
                underlineShow={false}
                disabled={this.state.disableForm}
              >
                {(this.state.heightUnit === 1) ? heightInches : heightCentimeter}
              </SelectField>
              <SelectField
                className="profile-container__rightside-selectfield"
                floatingLabelText="Unit"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.heightUnit}
                onChange={this.onHeightUnitChange}
                underlineShow={false}
                disabled={this.state.disableForm}
              >
                <MenuItem value={1} primaryText="in" />
                <MenuItem value={2} primaryText="cm" />
              </SelectField>
            </div>
            <Divider />
            <div className="profile-container__selectfield">
              <SelectField
                className="profile-container__leftside-selectfield"
                floatingLabelText="Weight"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.weight}
                onChange={this.onWeightChange}
                underlineShow={false}
                disabled={this.state.disableForm}
              >
                {(this.state.weightUnit === 'lb') ? weightPounds : weightkilograms}
              </SelectField>
              <SelectField
                className="profile-container__rightside-selectfield"
                floatingLabelText="Unit"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.weightUnit}
                onChange={this.onWeightUnitChange}
                underlineShow={false}
                disabled={this.state.disableForm}
              >
                <MenuItem value={1} primaryText="lb" />
                <MenuItem value={2} primaryText="kg" />
              </SelectField>
            </div>
            <Divider />
            <DatePicker
              className="profile-container__textfield"
              floatingLabelText="Birthdate"
              floatingLabelFocusStyle={{ color: grey900 }}
              container="inline"
              underlineShow={false}
              mode="landscape"
              value={this.state.date}
              onChange={this.onDateChange}
              disabled={this.state.disableForm}
            />
            <Divider />
            <TextField
              className="profile-container__textfield"
              floatingLabelText="Email"
              floatingLabelFocusStyle={{ color: grey900 }}
              underlineShow={false}
              value={this.state.email}
              onChange={this.onEmailChange}
              disabled={this.state.disableForm}
            />
            <Divider />
          </Form>
        </div>
      </div>
    );
  }
}

export default Profile;
