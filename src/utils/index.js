import Swal from "sweetalert2";
import { settings } from "../common/settings";

export const checkDuplicate = (data,array) => {
    return array.some(
        (item) => item.productName === data
      );
}

export const messageSuccess = item => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: `Thêm ${item.productName} vào giỏ hàng`,
    timer: 1200,
    showConfirmButton: false,
  });
}

export const messageError = item => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: `${item.productName} đã có trong giỏ hàng`,
    showConfirmButton: false,
  });
}

export const isLogin = () => {  
  if(localStorage.getItem('token') == null){
    return false;
  }
  return true;
}

export const logOut = () => {
  localStorage.removeItem(settings.token);
  localStorage.removeItem(settings.userLogin);
}