import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import TextField from 'material-ui/TextField';
import { red500, grey900 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import constants from '../../utils/constants';
import Form from '../common/Form/Form';
import './Profile.scss';

const { heightValuesIn, heightValuesCm, weightValuesLb, weightValuesKg } = constants;

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

class Profile extends Component {

  static propTypes = {
    auth: PropTypes.shape({
      user: PropTypes.object,
      inProgress: PropTypes.bool,
    }),
    userActions: PropTypes.shape({
      updateUser: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);

    const { user } = this.props.auth;

    this.state = {
      nickname: user.nickname,
      gender: user.gender,
      height: (user.heightUnitPreference === 1) ? user.height : Math.ceil(user.height * 2.54),
      heightUnitPreference: user.heightUnitPreference,
      weight: (user.weightUnitPreference === 1) ? user.weight : Math.round(user.weight * 0.453592),
      weightUnitPreference: user.weightUnitPreference,
      email: user.email,
      birthdate: user.birthdate ? new Date(user.birthdate) : null,
      disableForm: true,
      validEmail: false,
      emailPristine: true,
    };
  }

  @autobind
  onNicknameChange(evt) {
    this.setState({ nickname: evt.target.value });
  }

  @autobind
  onEmailChange(evt) {
    const stateChanges = {
      validEmail: constants.emailRegex.test(evt.target.value.trim()),
      email: evt.target.value,
    };

    if (this.state.emailPristine) {
      stateChanges.emailPristine = false;
    }

    this.setState(stateChanges);
  }

  @autobind
  onDateChange(evt, date) {
    this.setState({ birthdate: date });
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
    // If the selection is not the current selection
    if (value !== this.state.heightUnitPreference) {
      const stateChanges = {
        heightUnitPreference: value,
      };

      if (this.state.heightUnitPreference === 1) { // if unit is inches
        stateChanges.height = Math.ceil(this.state.height * 2.54);
      }

      if (this.state.heightUnitPreference === 2) { // if unit is cm
        stateChanges.height = Math.round(this.state.height / 2.54);
      }

      return this.setState(stateChanges);
    }
    return null;
  }

  @autobind
  onWeightChange(evt, idx, value) {
    this.setState({ weight: value });
  }

  @autobind
  onWeightUnitChange(evt, idx, value) {
    // If the selection is not the current selection
    if (value !== this.state.weightUnitPreference) {
      const stateChanges = {
        weightUnitPreference: value,
      };

      if (this.state.weightUnitPreference === 1) { // if unit is LB
        stateChanges.weight = Math.round(this.state.weight * 0.453592);
      }

      if (this.state.weightUnitPreference === 2) { // if unit is kg
        stateChanges.weight = Math.round(this.state.weight / 0.453592);
      }

      return this.setState(stateChanges);
    }
    return null;
  }

  @autobind
  onSave() {
    const { user } = this.props.auth;
    const {
      nickname,
      gender,
      birthdate,
      weight,
      weightUnitPreference,
      height,
      heightUnitPreference,
      email,
      disableForm,
      validEmail,
      emailPristine,
    } = this.state;
    const weightInInches = weightUnitPreference === 1 ? weight : Math.round(weight / 0.453592);
    const heightinInches = heightUnitPreference === 1 ? height : Math.round(height / 2.54);

    const profileData = {
      nickname,
      gender,
      birthdate,
      heightUnitPreference,
      weightUnitPreference,
      // Ensure weight (lb) / height (in) values will be stored as the base measurements
      weight: weightInInches,
      height: heightinInches,
    };

    // Check if email has changed and assign separately
    if (email !== user.email) {
      profileData.email = email;
    }

    // Check if email is valid
    if (!validEmail && !emailPristine) {
      return null;
    }

    // Check if state is same as user's profile
    if (email === user.email &&
      nickname === user.nickname &&
      gender === user.gender &&
      birthdate.getTime() === new Date(user.birthdate).getTime() &&
      heightinInches === user.height &&
      weightInInches === user.weight &&
      weightUnitPreference === user.weightUnitPreference &&
      heightUnitPreference === user.heightUnitPreference) {
      if (!disableForm) {
        return this.setState({ disableForm: true });
      }
      return null;
    }

    this.setState({ disableForm: !disableForm });
    return this.props.userActions.updateUser(profileData);
  }

  @autobind
  editForm() {
    const { user } = this.props.auth;

    const stateChanges = {
      disableForm: !this.state.disableForm,
    };

    // If user cancels edit, undo any changes
    if (!this.state.disableForm) {
      stateChanges.nickname = user.nickname;
      stateChanges.gender = user.gender;
      stateChanges.birthdate = user.birthdate ? new Date(user.birthdate) : null;
      stateChanges.weight = (user.weightUnitPreference === 1) ? user.weight :
      Math.ceil(user.weight * 0.453592);
      stateChanges.weightUnitPreference = user.weightUnitPreference;
      stateChanges.height = (user.heightUnitPreference === 1) ? user.height :
      Math.ceil(user.height * 2.54);
      stateChanges.heightUnitPreference = user.heightUnitPreference;
      stateChanges.email = user.email;
    }

    this.setState(stateChanges);
  }

  render() {
    const { emailPristine, validEmail } = this.state;
    let emailWarning;
    if (!emailPristine) {
      emailWarning = validEmail ? null : 'Please enter a valid email address';
    }
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
            { this.props.auth.inProgress ?
              <CircularProgress
                className="profile-container__cta"
                color={red500}
                size={30}
              /> :
              <RaisedButton
                className="profile-container__cta"
                label="Save changes"
                backgroundColor={red500}
                labelColor="#FFF"
                onClick={this.onSave}
              />
            }
          </div>
          <Form
            className="profile-container__form"
            paperStyle="paperStyle"
          >
            <TextField
              className="profile-container__textfield"
              floatingLabelText="Nickname"
              underlineShow={false}
              value={this.state.nickname}
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
                {(this.state.heightUnitPreference === 1) ? heightInches : heightCentimeter}
              </SelectField>
              <SelectField
                className="profile-container__rightside-selectfield"
                floatingLabelText="Unit"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.heightUnitPreference}
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
                {(this.state.weightUnitPreference === 1) ? weightPounds : weightkilograms}
              </SelectField>
              <SelectField
                className="profile-container__rightside-selectfield"
                floatingLabelText="Unit"
                floatingLabelFocusStyle={{ color: grey900 }}
                value={this.state.weightUnitPreference}
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
              value={this.state.birthdate}
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
              errorText={emailWarning}
            />
            <Divider />
          </Form>
        </div>
      </div>
    );
  }
}

export default Profile;
