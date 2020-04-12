/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import Header from "../../Header/Header";
import style from "./CartPage.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  recvProductList,
  removeProduct,
  removeAllProduct,
} from "../../../redux/actions/ProductListManageAction";

class CartPage extends Component {
  header = {
    title: "Cart",
    type: "cart",
    subTitle: "All the selected products in your cart",
    button: "",
  };
  constructor(props) {
    super(props);
    this.state = {
      listCart: this.props.infoBuy,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({
        listCart:nextProps.infoBuy
    })
  }
  quantityChange = (type, index) => {
    let newCard = [...this.state.listCart];
    if (type === "plus") {
      newCard[index].quantity++;
      this.setState({
        listCart: newCard,
      });
    } else {
      if (newCard[index].quantity < 2) return;
      newCard[index].quantity--;
      this.setState({
        listCart: newCard,
      });
    }
  };
  grandTotal = (listCard) => {
    return listCard.reduce((total, item, index) => {
      return (total += item.price * item.quantity);
    }, 0);
  };
  handleShopping = (data) => {
    this.props.handleShopping(data);
  };
  render() {
    return (
      <Fragment>
        <Header header={this.header} />
        <div className={style.cart}>
          <div className={style.wrapper_button}>
            <button onClick={()=> this.props.removeAllProduct()} className="btn btn-danger">
              <i className="fa fa-times-circle"></i> Clear Cart
            </button>
            <button className="btn btn-success">
              <i className="fa fa-shopping-cart"></i> Check out
            </button>
          </div>
          <div className="table_cart">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit price</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listCart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.productName}</th>
                      <td>
                        {" "}
                        <button
                          onClick={() => this.quantityChange("plus", index)}
                          className={`btn btn-success ${style.plus}`}
                        >
                          <b>+</b>
                        </button>{" "}
                        <a className={style.quantity}>{item.quantity}</a>{" "}
                        <button
                          onClick={() => this.quantityChange("minus", index)}
                          className={`btn btn-danger ${style.plus}`}
                        >
                          <b>-</b>
                        </button>
                      </td>
                      <td>{item.price}</td>
                      <td>
                        <b>{item.price * item.quantity}</b>
                      </td>
                      <td>
                        <a
                          onClick={() =>this.props.removeProduct(item.id)}
                          className={`${style.btn_red} btn`}
                        >
                          <i className="fa fa-times"></i> Remove
                        </a>
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <td></td>
                  <td></td>
                  <td className="font-weight-bold">Grand Total</td>
                  <td className="font-weight-bold">
                    {this.grandTotal(this.state.listCart)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <NavLink
            onClick={() => this.handleShopping(this.state.listCart)}
            to="/productlist"
            className="btn btn-success"
          >
            <i className="fa fa-arrow-circle-o-left"></i> continue shopping
          </NavLink>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  infoBuy: state.ProductListManageReducer.infoBuyItem,
});
const mapDispatchToProps = (dispatch) => ({
  handleShopping: (data) => dispatch(recvProductList(data)),
  removeProduct: (data) => dispatch(removeProduct(data)),
  removeAllProduct:() => dispatch(removeAllProduct())
});
export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
