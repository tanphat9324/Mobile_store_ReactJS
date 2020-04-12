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
      errors: {
        email: "",
        password: "",
      },
      valid: false,
    };
  }

  handleChange = (e) => {
    let { value, name } = e.target;
    this.setState({
      user: { ...this.state.user, [name]: value },
    });
  };

  handleError = (e) => {
    let { name, value } = e.target;
    let error = value === "" ? name + " không được để trống!" : "";
    if (name === "email") {
      let regex = /^[a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
      if (!regex.test(value)) {
        error = "Không đúng định dạng email";
      }
    }
    if (name === "password") {
      let regex = /^[a-z0-9_-]{3,12}$/;
      if (!regex.test(value)) {
        error = "3-6 kí tự gồm chữ cái, số và dấu gạch ngang";
      }
    }
    this.state.valid = error === "" ? true : false;
    this.setState({
      errors: { ...this.state.errors, [name]: error },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let user = { ...this.state.user, returnSecureToken: "true" };
    // console.log(user);
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
                    this.state.errors.email !== "" ? "sai" : "dung"
                  }`}
                  name="email"
                  onChange={this.handleChange}
                  onKeyUp={this.handleError}
                  onBlur={this.handleError}
                  id="email"
                  placeholder="Email"
                />
                <div className="isValid">
                  {this.state.errors.email !== "" ? (
                    <div className="help-block">{this.state.errors.email}</div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-group wrapper_input form-password">
                <input
                  placeholder="Password"
                  className={`form-control ${
                    this.state.errors.password !== "" ? "sai" : "dung"
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
                  {this.state.errors.password !== "" ? (
                    <div className="help-block">
                      {this.state.errors.password}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="wrapper_buttonLogin">
                <button
                  className="btn btn-success button_submit"
                  disabled={!this.state.valid}
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
