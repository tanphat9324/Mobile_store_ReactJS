import { settings } from "../../common/settings";
import axios from "axios";
import Swal from "sweetalert2";

export const logIn = (data, navigation) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcd9sKBFEnMftwhCuLqGUJs86q-f1R49U`,
      data,
    })
      .then((res) => {
        localStorage.setItem(settings.userLogin, JSON.stringify(res.data));
        localStorage.setItem(settings.token, JSON.stringify(res.data.idToken));
      })
      .then(() => {
        navigation();
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Mời nhập lại",
          showConfirmButton: true,
        });
      });
  };
};
