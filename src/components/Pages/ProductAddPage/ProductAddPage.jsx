import React, { Component, Fragment } from "react";
import { storage } from "../../../common/firebase";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import "./ProductAddPage.css";
import { addProduct } from "../../../redux/actions/ProductListManageAction";
class ProductAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productAdd: {
        productName: "",
        price: "",
        unitStock: "0",
        desc: "",
        manufacturer: "",
        category: "",
        cond: "New",
      },
      image: "",
      url: "",
      progress: 0,
      formValid:false
    };
  }
  header = {
    title: "Products",
    type: "productadd",
    subTitle: "Add products",
    button: "logout",
  };

  handleChange = (e) => {
    let { value, name } = e.target;
    this.setState({
      productAdd: { ...this.state.productAdd, [name]: value },
    });
  };
  handleChangeImage = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image: image.name });
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progrss function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              this.setState({ url });
            });
        }
      );
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const productForm = {
      ...this.state.productAdd,
      imageFile: this.state.url,
      returnSecureToken: true,
    };
    this.props.addItemProduct(productForm, this.resetForm);
    console.log(productForm);
  };
  resetForm = () => {
    console.log("resetform");
    this.setState({
      productAdd: {
        productName: "",
        price: "",
        unitStock: "0",
        desc: "",
        manufacturer: "",
        category: "",
        cond: "New",
      },
      image: "",
      url: "",
      progress: 0,
    });
  };
  render() {
    return (
      <Fragment>
        <Header header={this.header} />
        <div className="new_product">
          <div className="product_title">Add new product</div>
          <hr />
          <div className="form_product row">
            <form
              noValidate
              onSubmit={this.handleSubmit}
              id="survey-form"
              className="col-6"
            >
              <Fragment>
                <label id="name-label">Product Name </label>
                <input
                  name="productName"
                  className="form-control"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.productAdd.productName}
                  required
                />
                <label id="email-label">Unit Price </label>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.productAdd.price}
                  required
                />
                <label id="number-label">Units In Stock </label>
                <input
                  className="form-control"
                  name="unitStock"
                  id="number"
                  type="number"
                  value={this.state.productAdd.unitStock}
                  min="18"
                  max="30"
                  onChange={this.handleChange}
                  required
                />
                <label>Description</label>
                <textarea
                  rows="3"
                  cols="23"
                  name="desc"
                  className="form-control"
                  value={this.state.productAdd.desc}
                  onChange={this.handleChange}
                ></textarea>
                <label id="name-label" htmlFor="name">
                  Manufacturer{" "}
                </label>
                <input
                  className="form-control"
                  name="manufacturer"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.productAdd.manufacturer}
                  required
                />
                <label id="name-label" htmlFor="name">
                  Category{" "}
                </label>
                <input
                  name="category"
                  className="form-control"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.productAdd.category}
                  required
                />
                <label>Condition </label>
                <div id="radio">
                  <div className="form-check form-check-inline">
                    <input
                      name="cond"
                      className="form-check-input"
                      type="radio"
                      id="inlineRadio1"
                      onChange={this.handleChange}
                      checked
                      value="New"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      New
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cond"
                      onChange={this.handleChange}
                      id="inlineRadio2"
                      value="Old"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Old
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="cond"
                      onChange={this.handleChange}
                      id="inlineRadio2"
                      value="Refurbished"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Refurbished
                    </label>
                  </div>
                </div>
                <label id="">Product Image File</label>
                <label id="upload" className="btn" htmlFor="upload-photo">
                  {this.state.image ? this.state.image : "Chọn tệp"}
                </label>
                <input
                  className="form-control form-control-file"
                  type="file"
                  id="upload-photo"
                  onChange={this.handleChangeImage}
                />
                <label id="progress" htmlFor="progress"></label>
                <progress value={this.state.progress} max="100" />
                <label id="name-label" htmlFor="name"></label>
                <button disabled={!this.state.formValid} className="btn btn-blue" type="submit">
                  Add Product
                </button>
              </Fragment>
            </form>
            <div className="col-6">
              <img
                src={this.state.url || "http://via.placeholder.com/400x460"}
                alt="Uploaded images"
                height="460"
                width="400"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemProduct: (item, callback) => dispatch(addProduct(item, callback)),
  };
};

export default connect(null, mapDispatchToProps)(ProductAddPage);
