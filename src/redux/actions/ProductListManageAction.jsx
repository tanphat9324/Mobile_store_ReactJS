import { actionType } from "../constants/ProductListConstants";
import { settings } from "../../common/settings";
import axios from "axios";

export const recvProductList = (data) => {
  return {
    type: actionType.RECEIVE_PRODUCT_LIST,
    data,
  };
};
export const loadProductList = (data) => {
  return {
    type: actionType.LOAD_PRODUCT_LIST,
    data
  }
}
export const recvProductById = (data) => {
  return {
    type: actionType.RECEIVE_PRODUCT_BY_ID,
    data,
  };
};
export const getProductList = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: settings.domain + `/posts.json`,
    })
      .then((res) => {
        let productList = [];
        let data = res.data;
        for (const key in data) {
          productList.push({ ...data[key], id: key});
        }
        for (let i = 0; i < productList.length; i++) {
          productList[i].quantity = 1; 
        }
        dispatch(recvProductList(productList));
      })
      .catch((err) => {});
  };
};

export const getProductById = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `https://mobilestore-455ea.firebaseio.com/posts/${id}.json`,
    })
      .then((res) => {
        dispatch(recvProductById(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addProduct = (item, callback) => {
  const idToken = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    axios({
      method: "POST",
      url:
        "https://mobilestore-455ea.firebaseio.com/posts.json?auth=" + idToken,
      data: item,
    })
      .then((res) => {
        callback();
        alert("Product add successfull!");
      })
      .catch((err) => {});
  };
};

export const buyProduct = (id) => {
    return {
        type:actionType.BUY_PRODUCT,
        id,
    }
}

export const removeProduct = data => {
  return {
    type:actionType.REMOVE_PRODUCT,
    data
  }
}

export const removeAllProduct = () => {
  return {
    type:actionType.REMOVE_ALL_PRODUCT,
  }
}