import { connect } from "react-redux";
import { useState } from "react";
import authActions from "../redux/actions/authActions";
import Navbar from "../components/Navbar.jsx";
import firebase from "firebase";
import { FcGoogle } from "react-icons/fc";
import fondo2 from "../assets/fondos/fondo-2.jpg";
import Swal from "sweetalert2";

const Login = (props) => {
  const [users, setUsers] = useState({
    username: "",
    password: "",
  });
  const [errores, setErrores] = useState([]);

  const validateUser = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    setUsers({
      ...users,
      [field]: inputValue,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    if (users.username === "" || users.password === "") {
      Swal.fire("Uh!", "Debes completar todos los campos!", "error");

      return false;
    }
    const respuesta = await props.loginUser(users);
    if (respuesta && !respuesta.success) {
      setErrores(respuesta.respuesta);
    } else {
      props.history.goBack();
    }
  };

  const loginWithRS = async (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const dates = await firebase.auth().signInWithPopup(provider);
    props.loginWithGoogle(dates.user);
    props.history.goBack();
  };

  return (
    <div
      className="container-fluid d-flex p-0 menu-responsive login-fondo"
      style={{
        backgroundImage: `url(${fondo2})`,
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <div className="container-fluid pt-3 d-flex align-items-center ">
        <div className="trasparent  col-sm-12 col-md-5 col-lg-5 col-xl-5 p-4 mx-auto d-flex flex-column text-center border ">
          <span className="h1">Ingresar</span>
          <input
            className="text-center h3"
            placeholder="Ingresa tu email"
            name="username"
            onChange={validateUser}
          ></input>
          <input
            className="text-center my-4 h3"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            onChange={validateUser}
          ></input>
          <button onClick={login} className="h3">
            Ingresar
          </button>
          <label>{errores}</label>
          <button
            onClick={loginWithRS}
            className="h3 d-flex justify-content-center align-items-center"
          >
            Ingresar con Google <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginUser: authActions.loginUser,
  loginWithGoogle: authActions.loginWithGoogle,
};

export default connect(null, mapDispatchToProps)(Login);
