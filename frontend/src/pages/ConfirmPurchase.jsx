import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import  MercadoPago  from "../components/MercadoPago";
import Navbar from "../components/Navbar";

const ConfirmPurchase = (props) => {
  console.log(props)
  const [data, setData] = useState({ 
    tip: 0,
    name: props.loggedUser.firstname,
    token: props.loggedUser.token,
    urlPic: props.loggedUser.urlPic,
    address:"",
    phone:"",
   });

  let parsedCart = JSON.parse(localStorage.getItem("cart"));

  let acc = 0;

  parsedCart &&
    parsedCart.map(
      (item) => (acc += item.subcategory.price * item.subcategory.qty)
    );

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
      total: acc,
    });
  };

  return (
    <div className="container-fluid d-flex p-0 menu-responsive">
      <Navbar />
      <div className="container p-5">
        <div className="row justify-content-center">
          <div className="col-8 trasparent p-4">
            <form>
              
              <label htmlFor="address"className="h1">Dirección</label>
              <input
                type="text"
                className="form-control h2"
                id="address"
                name="address"
                placeholder="Segurola y Habana 4310"
                onChange={handleChange}
              ></input>
              <label htmlFor="phone" className="h1">Teléfono</label>
              <input
                type="text"
                className="form-control h2"
                id="phone"
                name="phone"
                placeholder="+54 9 11 1111 1111"
                onChange={handleChange}
              ></input>
     
          <p className="h3">Propina</p>
          
            <input
              className="mx-2"
              type="radio"
              name="tip"
              id="inlineRadio1"
              defaultChecked={true}
              value={0}
              onChange={handleChange}
            ></input>
            <label className="" htmlFor="inlineRadio1">
              $0
            </label>
       
            <input
              className="mx-2"
              type="radio"
              name="tip"
              id="inlineRadio2"
              value={25}
              onChange={handleChange}
            ></input>
            <label htmlFor="inlineRadio2">
              $25
            </label>

            <input
              className="mx-2"
              type="radio"
              name="tip"
              id="inlineRadio3"
              value={50}
              onChange={handleChange}
            ></input>
            <label htmlFor="inlineRadio3">
              $50
            </label>

            <input
              className="mx-2"
              type="radio"
              name="tip"
              id="inlineRadio4"
              value={100}
              onChange={handleChange}
            ></input>
            <label htmlFor="inlineRadio4">
              $100
            </label>
            <br/>
          
            <label htmlFor="notes" className="  h3">Notas acerca del pedido</label>
            <textarea            
              className="form-control"
              id="notes"
              rows="3"
              name="orderNotes"
              placeholder="Sin lechuga/con ketchup... (Opcional)"
              onChange={handleChange}
            ></textarea>

            <label htmlFor="notes" className="  h3">Notas acerca del domicilio</label>
            <textarea
              class="form-control"
              id="notes"
              rows="3"
              name="addressNotes"
              placeholder="Primer piso/rejas negras...(Opcional)"
              onChange={handleChange}
            ></textarea>
      
        </form>
            <div className="container text-center my-2">
              <span className="h1 text-center">TOTAL: ${acc + parseInt(data.tip)}</span>
            </div>
            <div className="container d-flex justify-content-around">
              <button onClick={goBack} type="button" className="btn-danger h1">
                Atrás
              </button>
                <MercadoPago data={data} history={props.history}/>
            </div>
          </div>
        </div>
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



export default connect(mapStateToProps)(ConfirmPurchase);
