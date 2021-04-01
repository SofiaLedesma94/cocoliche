import React, { useEffect } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import CartItem from "../components/CartItem.jsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import fondo6 from "../assets/fondos/fondo-6.jpg";
import  Swal  from 'sweetalert2';



const Cart = (props) => {
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    props.localStorageCart(localCart);
  }, []);

  let acc = [];
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const history = useHistory();

  const goToPay = () => {
    if(!props.loggedUser){
      Swal.fire("Ingresa a tu cuenta para Finalizar la Compra")
      props.history.push('/login')
      return false
  }else{
    history.push(`/confirm`);
  }
   

  };

  return (
    <div className="container-fluid d-flex p-0 menu-responsive">
      <Navbar />
      <div className="container-fluid d-flex align-items-center justify-content-center cart-fondo py-4" style={{ backgroundImage: `url(${fondo6})`, backgroundAttachment: "fixed",
      }}>
        {props.cart && props.cart.length ? (
          <div className="col-sm-12 col-md-8 col-lg-8  trasparent px-4 mx-auto ">
            <h1 className='text-center'>Mi carrito</h1>
            <h5 className='text-center mb-3'>Haz click en “Finalizar Compra” para ingresar tus datos.</h5>

            {props.cart && props.cart.map((item) => <CartItem props={item} />)}
            {props.cart.map((item) => {
            acc.push(item.subcategory.price * item.subcategory.qty);
            })}
            <div className="text-center p-4 mt-3 border border-dark">
              <span class="h1">{`Total: $ ${acc.length && acc.reduce(reducer)}`}</span>
            </div>
            <div className="container-fluid d-flex justify-content-center p-3">
              <button
                type="button"
                class="btn btn-primary p-2 pr-5 pl-5"
                style={{ fontSize: "32px" }}
                onClick={goToPay}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
              
        ) 
        : 
        (
          <div className="col-6 trasparent my-auto text-center p-4">
            <Link to="/menu">
              <h1>Agrega algun producto a tu carrito !</h1>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  localStorageCart: cartActions.localStorageCart,
  confirmPurchase: cartActions.confirmPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
