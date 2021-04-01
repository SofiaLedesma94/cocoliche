import { connect } from "react-redux";
import { useState } from "react";
import authActions from "../redux/actions/authActions.jsx";
import Navbar from "../components/Navbar";
import firebase from "firebase";
import fondo3 from "../assets/fondos/fondo-3.jpg";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [errores, setErrores] = useState([]);
  const validateUser = (e) => {
    const inputValue = e.target.value;
    const field = e.target.name;
    setUser({
      ...user,
      [field]: inputValue,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (
      user.username === "" ||
      user.password === "" ||
      user.firstname === "" ||
      user.lastname === ""
    ) {
      Swal.fire("Uh!", "Debes completar todos los campos!", "error");
      return false;
    }
    const respuesta = await props.newUser(user);
    if (respuesta && !respuesta.success) {
      setErrores(respuesta.response.details);
    }
  };
  const loginWithRS = async (e) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const dates = await firebase.auth().signInWithPopup(provider);
    props.loginWithGoogle(dates.user);
  };

  return (
    <div className="container-fluid d-flex p-0 menu-responsive ">
      <Navbar />
      <div
        className="container-fluid pt-3 d-flex align-items-center login-fondo"
        style={{ backgroundImage: `url(${fondo3})` }}
      >
        <div className="trasparent col-sm-12 col-md-5 col-lg-5 col-xl-5 mx-auto d-flex flex-column text-center border py-4">
          <span className="h1">Registrate</span>
          <input
            className="text-center my-3 h3"
            placeholder="Ingresa tu Nombre"
            name="firstname"
            onChange={validateUser}
          ></input>
          <input
            className="text-center h3"
            placeholder="Ingresa tu Apellido"
            name="lastname"
            onChange={validateUser}
          ></input>
          <input
            className="text-center my-3 h3"
            placeholder="Ingresa tu Email"
            name="username"
            onChange={validateUser}
          ></input>
          <input
            className="text-center h3"
            placeholder="Ingresa tu contraseña"
            type="password"
            name="password"
            onChange={validateUser}
          ></input>
          <button onClick={createUser} className="h3 my-3">
            Crear Cuenta
          </button>
          <button
            onClick={loginWithRS}
            className="h3 d-flex justify-content-center align-items-center"
          >
            Ingresar con Google <FcGoogle />
          </button>
          {errores.map((error) => (
            <label>{error.message}</label>
          ))}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};
const mapDispatchToProps = {
  newUser: authActions.newUser,
  loginWithGoogle: authActions.loginWithGoogle,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
