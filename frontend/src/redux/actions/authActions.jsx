import axios from "axios";
import { compareSync } from "bcryptjs";
import swal from "sweetalert2";
import { API } from "../../components/Api";

const authActions = {
  newUser: (newUser) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(`${API}/user/signup`, newUser);
      if (!respuesta.data.success) {
        swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Algo falló. Intenta otra vez",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      } else {
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido a Cocoliche Resto Bar",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data.response });
    };
  },
  loginUser: (user) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(`${API}/user/signin`, user);
      if (!respuesta.data.success) {
        swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Algo falló. Intenta otra vez",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      } else {
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido a Cocoliche Resto Bar",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data.response });
    };
  },
  loginWithGoogle: (response) => {
    return async (dispatch, getState) => {
      const respuesta = await axios.post(`${API}/user/sign_google`, response);
      if (!respuesta.data.success) {
        swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Something happened. Try again",
          showConfirmButton: false,
          timer: 1500,
        });
        return false;
      } else {
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido a Cocoliche Resto Bar",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch({ type: "LOG_USER", payload: respuesta.data.response });
    };
  },

  logoutUser: () => {
    return (dispatch, getState) => {
      swal.fire("Nos vemos Pronto")
      dispatch({ type: "LOG_OUT_USER" });
    };
  },
  //logueo desde local storage
  logFromLS: (token) => {
    return async (dispatch, getState) => {
      try {
        const respuesta = await axios.post(
          `${API}/user/ls`,
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({ type: "LOG_USER", payload: respuesta.data.response });
      } catch (err) {
        if (err.response) {
          swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Algo falló. Ingrese nuevamente",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.clear();
          return "/";
        }
      }
    };
  },
};

export default authActions;
