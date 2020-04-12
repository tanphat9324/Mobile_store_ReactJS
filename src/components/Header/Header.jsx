/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Header.css";
import { NavLink, withRouter } from "react-router-dom";
import { logOut } from "../../utils";

class Header extends Component {
  handleLogOut = () => {
    logOut();
    this.props.history.push("/");
  };
  render() {
    let { title,subTitle, button } = this.props.header;
    return (
      <div className="bg-header">
        <div className="row wrapper">
          <div className="col-6 wrapper_header">
            <div>
              <div className="header_title">{title}</div>
              {subTitle ? (
                <div className="header_detail">{subTitle}</div>
              ) : (
                <Fragment></Fragment>
              )}
            </div>
          </div>
          <div className="col-6 mt-4">
            <div className="wrapper_button">
              {button === "viewCart" ? (
                <NavLink to="/cart" className="btn view_cart">
                  <i className="fa fa-shopping-cart"></i> View cart{" "}
                  <span className="amount">{this.props.infoBuy.length}</span>
                </NavLink>
              ) : (
                <Fragment />
              )}
              {button === "logout" ? (
                <a
                  onClick={this.handleLogOut}
                  className="btn btn-danger logout"
                >
                  logout
                </a>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  infoBuy: state.ProductListManageReducer.infoBuyItem,
  checkDuplicateItem: state.ProductListManageReducer.checkDuplicate,
});
export default withRouter(connect(mapStateToProps, null)(Header));
