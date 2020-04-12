/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import "./DetailPage.css";
import {
  getProductById,
  buyProduct,
} from "../../../redux/actions/ProductListManageAction";
import { NavLink } from "react-router-dom";
import { messageError, messageSuccess } from "../../../utils";

class DetailPage extends Component {
  componentDidMount() {
    this.props.getProductById(this.props.match.params.id);
  }
  header = {
    title: "Products",
    type: "",
    subTitle: "",
    button: "",
  };
  handleBuy = (id, item) => {
    this.props.buyProduct(id);
    let index = this.props.infoBuy.findIndex(
      (x) => x.productName === item.productName
    );
    if (index >= 0) {
      messageError(item);
    } else {
      messageSuccess(item);
      this.props.history.push("/cart");
    }
  };
  render() {
    let { productItem } = this.props;
    let { id } = this.props.match.params;
    return (
      <Fragment>
        <Header header={this.header} />
        <div className="product_detail">
          <div className="row mr-0">
            <div className="col-6 pl-5">
              <img
                src={productItem.imageFile}
                width="400px"
                height="460px"
                alt=""
              />
            </div>

            <div className="col-6">
              <h4>{productItem.productName}</h4>
              <p>{productItem.desc}</p>
              <div className="product_title1">
                Item Code: <span className="product_code">123586940389</span>
              </div>
              <div className="product_title1">
                manufacturer:{" "}
                <span className="product_info">{productItem.manufacturer}</span>
              </div>
              <div className="product_title1">
                category: <a >{productItem.category}</a>
              </div>
              <div className="product_title1">
                Available units in stock:{" "}
                <span className="product_info">{productItem.unitStock}</span>
              </div>
              <div className="product_price">{productItem.price} USD</div>
              <div>
                <NavLink to="/productlist" className="btn btn-success">
                  <i className="fa fa-arrow-circle-o-left"></i> back
                </NavLink>
                <button
                  onClick={() => this.handleBuy(id, productItem)}
                  className="btn btn-warning ml-3 order"
                >
                  <i className="fa fa-shopping-cart"></i> Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  productItem: state.ProductListManageReducer.productItem,
  infoBuy: state.ProductListManageReducer.infoBuyItem,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getProductById: (id) => dispatch(getProductById(id)),
    buyProduct: (id, productList) => dispatch(buyProduct(id, productList)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
