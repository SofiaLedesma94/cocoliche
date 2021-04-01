import React, { useState} from "react";
import { slide as Menu } from "react-burger-menu";
import { IconContext } from "react-icons";
import {
  AiFillHome,
  AiFillRead,
  AiFillLayout,
  AiFillSmile,
  AiFillProfile,
  AiOutlineShoppingCart
} from "react-icons/ai";
import { GoSignOut, GoSignIn } from "react-icons/go";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from '../assets/cocoliche-logo.png'
import blackboard from '../assets/blackboard.jpg'



const BurgerMenu = (props) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(!open);
  };
  if (props.props.loggedUser) {
    var links = (
      <>
        <NavLink
          to={'/profile'}
          className="userLinkBurger"
        >
          <img
            src={props.props.loggedUser.urlPic}
            alt="profile"
            className="userImg"
          />
          <h6>{props.props.loggedUser.firstname}</h6>
        </NavLink>
        {props.props.loggedUser.role=="admin"&&
          <NavLink to="/admin" className="text-decoration-none mt-2">
            <div
              id="Administración"
              className="menu-item"
              style={{ marginLeft: "1rem" }}
              >
                <div className="iconMenu">
                  <RiAdminFill />
                </div>
                <div className="optionMenu">
                  Administración
                </div>
            </div>
          </NavLink>
          
        }
      </>
    );
  }
  if (props.props.loggedUser === null) {
    var login = (
      <>
        <NavLink to="/login" onClick={closeMenu}>
          <div
            id="login"
            className="menu-item"
            style={{ marginLeft: "1rem" }}
          >
            <div className="iconMenu">
              <GoSignIn />
            </div>
            <div className="optionMenu">Ingresar</div>
          </div>
        </NavLink>
        <NavLink to="/register" onClick={closeMenu}>
          <div
            id="register"
            className="menu-item"
            style={{ marginLeft: "1rem" }}
          >
            <div className="iconMenu">
              <BsFillPersonPlusFill />
            </div>
            <div className="optionMenu">Registrarse</div>
          </div>
        </NavLink>
      </>
    );
  }

  return (
    <>
    <div className="burger-menu justify-content-center align-items-center sticky-top" style={{backgroundImage: `url(${blackboard})`}}>
      <NavLink to="/" className="text-decoration-none align-items-center">
        <div className="logo" style={{backgroundImage: `url(${logo})`}}>
        </div>
      </NavLink>
      <NavLink to="/cart">
        <IconContext.Provider value={{ color: "white", size:"30px"}}>
          <AiOutlineShoppingCart/>
        </IconContext.Provider>          
      </NavLink>
      <Menu isOpen={open} right>
    <div className="sideBarTitle">
      <div className="brgMenuTitle" style={{ width: "50%" }}>
        <h2 style={{ fontSize: "35px" }}>Cocoliche</h2>
      </div>
    </div>
    {links}
    {login}
    <NavLink to="/menu" onClick={closeMenu}>
      <div id="menu" className="menu-item" href="/">
        <div className="iconMenu">
          <AiFillRead />
        </div>
        <div className="optionMenu">Menú</div>
      </div>
    </NavLink>
    <NavLink to="/cart" onClick={closeMenu}>
      <div id="cart" className="menu-item" href="/">
        <div className="iconMenu">
          <AiFillLayout />
        </div>
        <div className="optionMenu">Mi Pedido</div>
      </div>
    </NavLink>
    <NavLink to="/calendar" onClick={closeMenu}>
      <div id="calendar" className="menu-item" href="/">
        <div className="iconMenu">
          <AiFillSmile />
        </div>
        <div className="optionMenu">Eventos</div>
      </div>
    </NavLink>
    <NavLink to="/contact" onClick={closeMenu}>
      <div id="contact" className="menu-item" href="/">
        <div className="iconMenu">
          <AiFillProfile />
        </div>
        <div className="optionMenu">Contacto</div>
      </div>
    </NavLink>
    <NavLink to="/reservation" onClick={closeMenu}>
      <div id="reservation" className="menu-item" href="/">
        <div className="iconMenu">
          <AiFillHome />
        </div>
        <div className="optionMenu">Hacé tu Reserva</div>
      </div>
    </NavLink>
    {props.props.loggedUser && (
      <NavLink to="/" onClick={closeMenu}>
        <div id="logOut" className="menu-item" href="/">
          <div className="iconMenu">
            <GoSignOut
              className="logOutIconBurger"
              onClick={() => props.logoutUser()}
            />
          </div>
          <div className="optionMenu" onClick={() => props.logoutUser()}>
            Cerrar Sesion
          </div>
        </div>
      </NavLink>
    )}
</Menu>
    </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  logoutUser: authActions.logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);