/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../../Header/Header";
import "./ProductListPage.css";
import { getProductList } from "../../../redux/actions/ProductListManageAction";
import { buyProduct } from "../../../redux/actions/ProductListManageAction";
import { messageSuccess, messageError } from "../../../utils/index";
class ProductListPage extends Component {
  header = {
    title: "Products",
    type: "login",
    subTitle: "All the available products in our store",
    button: "viewCart",
  };

  componentDidMount() {
    this.props.getProductList();
  }
  handleBuy = (id, item) => {
    this.props.buyProduct(id);
    let index = this.props.infoBuy.findIndex(
      (x) => x.productName === item.productName
    );
    if (index >= 0) {
      messageError(item);
    } else {
      messageSuccess(item);
    }
  };

  render() {
    return (
      <Fragment>
        <Header header={this.header}></Header>
        <div className="product">
          {this.props.dataCard.map((item, index) => {
            return (
              <div key={index} className="card">
                <div className="productlist_title">{item.productName}</div>
                <div className="text-center">
                  <img src={item.imageFile} width="160px" height="200px" />
                </div>
                <div className="card-body">
                  <p className="card-text">{item.desc}</p>
                  <div className="price">{item.price} USD</div>
                  <div className="unitStock">
                    {item.unitStock} unit in stock
                  </div>
                  <div className="product_button">
                    <NavLink to={`/detail/${item.id}`} className="btn btn-blue">
                      <i className="fa fa-info-circle"></i>
                      Details
                    </NavLink>
                    <a
                      onClick={() => this.handleBuy(item.id, item)}
                      className="btn btn-yellow1 text_icon"
                    >
                      <i className="fa fa-shopping-cart"></i> Order Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  dataCard: state.ProductListManageReducer.dataProductList,
  infoBuy: state.ProductListManageReducer.infoBuyItem,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: () => dispatch(getProductList()),
    buyProduct: (id) => dispatch(buyProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
