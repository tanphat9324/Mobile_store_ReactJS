/* eslint-disable no-useless-escape */
/* eslint-disable react/no-direct-mutation-state */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import "./LoginPage.css";
import { logIn } from "../../../redux/actions/LoginManageAction";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: "",
      },
      formValid: false,
      emailValid: false,
      passwordValid: false,
    };
  }

  handleChange = (e) => {
    let { value, name } = e.target;
    this.setState(
      {
        user: { ...this.state.user, [name]: value },
      },
      () => {
        this.validateField(name, value);
      }
    );
  };
  validateField = (fieldName, value) => {
    let errors = value === "" ? fieldName + " không được để trống!" : "";
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let regex;
    switch (fieldName) {
      case "email": {
        regex = /^[a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
        errors = !regex.test(value) ? "Email is invalid" : (emailValid = true);
        break;
      }
      case "password": {
        regex = /^[a-z0-9_-]{3,12}$/;
        errors = !regex.test(value)
          ? "3-6 kí tự gồm chữ cái, số và dấu gạch ngang"
          : (passwordValid = true);
        break;
      }

      default:
        break;
    }
    this.setState(
      {
        formErrors: { ...this.state.formErrors, [fieldName]: errors },
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  };
  validateForm() {
    let { emailValid, passwordValid } = this.state;
    if (emailValid && passwordValid) {
      this.setState({
        formValid: true,
      });
    } else {
      this.setState({
        formValid: false,
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let user = { ...this.state.user, returnSecureToken: "true" };
    this.props.logIn(user, this.navigation);
  };
  navigation = () => {
    this.props.history.push("/productadd");
  };
  header = {
    title: "Mobile Store",
    type: "login",
    subTitle: "",
    button: "",
  };
  render() {
    return (
      <Fragment>
        <Header header={this.header}></Header>
        <div className="wrapper_login">
          <div className="form_login">
            <div className="form_title">Please sign in</div>
            <form noValidate onSubmit={this.handleSubmit}>
              <div id="firstInput" className="form-group wrapper_input">
                <input
                  type="email"
                  className={`form-control ${
                    this.state.emailValid ? "dung" : "sai"
                  }`}
                  name="email"
                  onChange={this.handleChange}
                  onKeyUp={this.handleError}
                  onBlur={this.handleError}
                  id="email"
                  placeholder="Email"
                />
                <div className="isValid">
                  {!this.state.emailValid ? (
                    <div className="help-block">
                      {this.state.formErrors.email}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group wrapper_input form-password">
                <input
                  placeholder="Password"
                  className={`form-control ${
                    this.state.passwordValid ? "dung" : "sai"
                  }`}
                  onChange={this.handleChange}
                  onKeyUp={this.handleError}
                  onBlur={this.handleError}
                  name="password"
                  id="password"
                  required
                />
                <span className="field-icon">
                  <i className="fa fa-fw fa-eye"></i>
                </span>
                <div className="isValid">
                  {!this.state.passwordValid ? (
                    <div className="help-block">
                      {this.state.formErrors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="wrapper_buttonLogin">
                <button
                  className="btn btn-success button_submit"
                  disabled={!this.state.formValid}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (data, navigation) => dispatch(logIn(data, navigation)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
