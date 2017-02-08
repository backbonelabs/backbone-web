import React, { Component, PropTypes } from 'react';
import autobind from 'autobind-decorator';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Panel from 'muicss/lib/react/panel';
import Option from 'muicss/lib/react/option';
import constants from '../../utils/constants';
import './Profile.scss';
import TextField from '../common/Form/TextField';
import SelectField from '../common/Form/SelectField';

const {
  heightValuesIn,
  heightValuesCm,
  weightValuesLb,
  weightValuesKg,
  heightConversion,
  weightConversion,
} = constants;

const heightInches = heightValuesIn.map(val => (
  <Option key={val} value={val} label={`${Math.floor(val / 12)}ft ${val % 12}in`} />
));

const heightCentimeter = heightValuesCm.map(val => (
  <Option key={val} value={val} label={val} />
));

const weightPounds = weightValuesLb.map(val => (
  <Option key={val} value={val} label={val} />
));

const weightkilograms = weightValuesKg.map(val => (
  <Option key={val} value={val} label={val} />
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
    let bday = '';
    const gender = user.gender ? user.gender.toString() : '2';
    const height = user.height ? user.height.toString() : '100';
    const weight = user.weight ? user.weight.toString() : '100';
    const heightUnitPreference = user.heightUnitPreference.toString();
    const weightUnitPreference = user.weightUnitPreference.toString();

    if (user.birthdate) {
      const birthDate = new Date(user.birthdate);
      const year = birthDate.getFullYear();
      const month = birthDate.getMonth() + 1;
      const day = birthDate.getDate();
      bday = `${month}/${day}/${year}`;
    }

    this.state = {
      nickname: user.nickname,
      gender,
      height: (heightUnitPreference === '1') ? height :
      Math.round(height * heightConversion).toString(),
      heightUnitPreference,
      weight: (weightUnitPreference === '1') ? weight :
      Math.round(weight * weightConversion).toString(),
      weightUnitPreference,
      email: user.email,
      birthdate: bday,
      disableForm: true,
      emailError: '',
      dateError: '',
      nicknameError: '',
    };
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
  onHeightUnitChange(evt) {
    // If the selection is not the current selection
    if (evt.target.value !== this.state.heightUnitPreference) {
      const stateChanges = {
        heightUnitPreference: evt.target.value,
      };

      if (this.state.heightUnitPreference === '1') { // if unit is inches
        stateChanges.height = Math.round(this.state.height * heightConversion).toString();
      }

      if (this.state.heightUnitPreference === '2') { // if unit is cm
        stateChanges.height = Math.max(1, Math.round(this.state.height / heightConversion))
        .toString();
      }

      return this.setState(stateChanges);
    }
    return null;
  }

  @autobind
  onWeightUnitChange(evt) {
    // If the selection is not the current selection
    if (evt.target.value !== this.state.weightUnitPreference) {
      const stateChanges = {
        weightUnitPreference: evt.target.value,
      };

      if (this.state.weightUnitPreference === '1') { // if unit is LB
        stateChanges.weight = Math.ceil(this.state.weight * weightConversion).toString();
      }

      if (this.state.weightUnitPreference === '2') { // if unit is kg
        stateChanges.weight = Math.round(this.state.weight / weightConversion).toString();
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
    } = this.state;
    const validEmail = constants.emailRegex.test(email);
    const validDate = constants.dateRegex.test(birthdate);
    const weightInInches = weightUnitPreference === '1' ? weight :
    Math.round(weight / weightConversion);
    const heightinInches = heightUnitPreference === '1' ? height :
    Math.max(1, Math.round(height / heightConversion));

    const profileData = {
      nickname,
      gender: parseInt(gender, 10),
      birthdate: new Date(birthdate),
      heightUnitPreference: parseInt(heightUnitPreference, 10),
      weightUnitPreference: parseInt(weightUnitPreference, 10),
      // Ensure weight (lb) / height (in) values will be stored as the base measurements
      // convert strings back to number
      weight: parseInt(weightInInches, 10),
      height: parseInt(heightinInches, 10),
    };

    // Check if email has changed and assign separately
    if (email !== user.email) {
      profileData.email = email;
    }

    const formErrorState = {
      emailError: '',
      dateError: '',
      nicknameError: '',
    };

    // Check if email is valid
    if (!validEmail) {
      formErrorState.emailError = 'Please enter a valid email address';
    }

    // Check if date is valid
    if (!validDate) {
      formErrorState.dateError = 'Please enter a valid date (MM/DD/YYYY)';
    }

    // Check if nickname is empty
    if (nickname.length === 0) {
      formErrorState.nicknameError = 'Please enter a nickname';
    }

    if (formErrorState.emailError || formErrorState.dateError || formErrorState.nicknameError) {
      return this.setState(formErrorState);
    }

    this.setState({ disableForm: !disableForm, dateError: '', emailError: '', nicknameError: '' });
    return this.props.userActions.updateUser(profileData);
  }

  @autobind
  handleOnChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  @autobind
  editForm() {
    const { user } = this.props.auth;
    const gender = user.gender ? user.gender.toString() : '2';
    const height = user.height ? user.height.toString() : '100';
    const weight = user.weight ? user.weight.toString() : '100';
    const heightUnitPreference = user.heightUnitPreference.toString();
    const weightUnitPreference = user.weightUnitPreference.toString();

    const stateChanges = {
      disableForm: !this.state.disableForm,
      emailError: '',
      dateError: '',
      nicknameError: '',
    };

    // If user cancels edit
    if (!this.state.disableForm) {
      let bday = '';
      if (user.birthdate) {
        const birthDate = new Date(user.birthdate);
        const year = birthDate.getFullYear();
        const month = birthDate.getMonth() + 1;
        const day = birthDate.getDate();
        bday = `${month}/${day}/${year}`;
      }
      // Undo any changes
      stateChanges.nickname = user.nickname;
      stateChanges.gender = gender;
      stateChanges.birthdate = bday;
      stateChanges.weight = (weightUnitPreference === '1') ? weight :
      Math.ceil(weight * weightConversion).toString();
      stateChanges.weightUnitPreference = weightUnitPreference;
      stateChanges.height = (heightUnitPreference === '1') ? height :
      Math.round(height * heightConversion).toString();
      stateChanges.heightUnitPreference = heightUnitPreference;
      stateChanges.email = user.email;
    }


    this.setState(stateChanges);
  }

  render() {
    const { disableForm, emailError, dateError, nicknameError } = this.state;
    return (
      <Container className="profile-container">
        <div className="profile-container__content-wrapper">
          <div className="profile-container__header">
            <h1>Profile</h1>
            <Button
              className="profile-container__edit-btn"
              variant="raised"
              onClick={this.editForm}
            >{disableForm ? 'Edit' : 'Cancel'} </Button>
            {
              disableForm ? null :
              <Button
                className="profile-container__cta"
                variant="raised"
                color="danger"
                onClick={this.onSave}
              > Save changes </Button>
            }
          </div>
          <Panel className="profile-container__form">
            <Form>
              <TextField
                label="Nickname"
                hint="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleOnChange}
                disabled={disableForm}
                errorText={nicknameError}
              />
              <SelectField
                onChange={this.handleOnChange}
                name="gender"
                label="Gender"
                value={this.state.gender}
                disabled={disableForm}
              >
                <Option value={'2'} label="Female" />
                <Option value={'1'} label="Male" />
              </SelectField>
              <div className="profile-container__selectfield">
                <div className="profile-container__leftside-selectfield">
                  <SelectField
                    label="Height"
                    name="height"
                    value={this.state.height}
                    onChange={this.handleOnChange}
                    disabled={disableForm}
                  >
                    {(this.state.heightUnitPreference === '1') ? heightInches : heightCentimeter}
                  </SelectField>
                </div>
                <div className="profile-container__rightside-selectfield">
                  <SelectField
                    label="Unit"
                    value={this.state.heightUnitPreference}
                    onChange={this.onHeightUnitChange}
                    disabled={disableForm}
                  >
                    <Option value={'1'} label="in" />
                    <Option value={'2'} label="cm" />
                  </SelectField>
                </div>
              </div>
              <div className="profile-container__selectfield">
                <div className="profile-container__leftside-selectfield">
                  <SelectField
                    label="Weight"
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleOnChange}
                    disabled={disableForm}
                  >
                    {(this.state.weightUnitPreference === '1') ? weightPounds : weightkilograms}
                  </SelectField>
                </div>
                <div className="profile-container__rightside-selectfield">
                  <SelectField
                    label="Unit"
                    value={this.state.weightUnitPreference}
                    onChange={this.onWeightUnitChange}
                    disabled={disableForm}
                  >
                    <Option value={'1'} label="lb" />
                    <Option value={'2'} label="kg" />
                  </SelectField>
                </div>
              </div>
              <TextField
                label="Birthdate"
                name="birthdate"
                hint="MM/DD/YYYY"
                value={this.state.birthdate}
                onChange={this.handleOnChange}
                disabled={disableForm}
                errorText={dateError}
              />
              <TextField
                label="Email"
                name="email"
                floatingLabel
                value={this.state.email}
                onChange={this.handleOnChange}
                disabled={disableForm}
                errorText={emailError}
              />
            </Form>
          </Panel>
        </div>
      </Container>
    );
  }
}

export default Profile;
