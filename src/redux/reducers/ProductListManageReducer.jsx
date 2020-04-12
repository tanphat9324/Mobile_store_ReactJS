import { actionType } from "../constants/ProductListConstants";
import {checkDuplicate} from '../../utils/index'
const stateProductList = {
  dataProductList: [],
  productItem: {},
  infoBuyItem: []
};

export const ProductListManageReducer = (state = stateProductList, action) => {
  switch (action.type) {
    case actionType.RECEIVE_PRODUCT_LIST: {
      state.dataProductList = action.data;
      return { ...state };
    }
    case actionType.RECEIVE_PRODUCT_BY_ID: {
      let newProductItem = action.data;
      state.productItem = newProductItem;
      return { ...state };
    }
    case actionType.BUY_PRODUCT: {
      let newProductList = [...state.dataProductList];
      let infoBuy = [...state.infoBuyItem];
      let index = newProductList.findIndex((item) => item.id === action.id);
      // console.log(newProductList);
      let checkProduct = checkDuplicate(newProductList[index].productName,infoBuy);
      if (!checkProduct) {
        infoBuy = [...infoBuy, newProductList[index]];
      }
      state.infoBuyItem = infoBuy;
      // console.log(state.infoBuyItem);
      return { ...state };
    }
    case actionType.REMOVE_PRODUCT: {
      let newProductList = [...state.infoBuyItem];
      // let index = newProductList.findIndex(x => x.id === action.data);
      // newProductList.splice(index,1);

      newProductList = newProductList.filter(x => x.id !== action.data);

      state.infoBuyItem = newProductList;
      // console.log(state.infoBuyItem);
      
      return {...state}
    }
    case actionType.REMOVE_ALL_PRODUCT: {
      let newProductList = [...state.infoBuyItem];
      newProductList.length = 0;
      state.infoBuyItem = newProductList;
      return {...state}

    }
    default:
      return state;
  }
};
