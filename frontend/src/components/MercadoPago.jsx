import React, { useState } from "react";
import { connect } from "react-redux";
import "../index.css";
import cartActions from "../redux/actions/cartActions";

const MercadoPago = (props) => {
  console.log(props);
  const [visible, setVisible] = useState(false);
  const sendCart = () => {
    props.confirmPurchase({
      cart: props.cart,
      data: props.data,
      confirmed: false,
    });
    props.history.push("/profile");
  };
  var priceAmount = 0;
  props.cart.map((item) => {
    priceAmount = item.subcategory.price * item.subcategory.qty + priceAmount;
  });

  var orderData = {
    quantity: 1,
    description: "Cocoliche Resto Bar",
    price: priceAmount,
  };
  const sendData = (e) => {
    setVisible(true);
    document.querySelector("#checkout").setAttribute("disabled", true);

    fetch("http://localhost:4000/api/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .catch((error) => console.log(error));
  };

  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.querySelector("#button-checkout").innerHTML = "";
    document.querySelector("#button-checkout").appendChild(script);
  }

  return (
    <>
      <button
        id="checkout"
        onClick={sendData}
        type="button"
        className="btn-primary h1"
      >
        Comprar
      </button>
      {visible && (
        <div className="modalCasero">
          <div className="modalCaseroContenido d-flex flex-column">
            <div className="text-center p-5">
              <h5 className="h1" id="exampleModalLabel">
                Resumen de la Compra
              </h5>
            </div>
            <div className="container-fluid">
              {props.cart.map((item) => {
                return (
                  <div>
                    <div className="container">
                      <div className="row mt-2 d-flex justify-content-between pl-3 pr-3 pb-3">
                        <div
                          className="col-3 menuCardImg"
                          style={{
                            backgroundImage: `url(${item.picture})`,
                            width: "100px",
                            height: "100px",
                            borderTopLeftRadius: "0px",
                            borderTopRightRadius: "0px",
                          }}
                        ></div>
                        <div className="col-4 d-flex flex-column justify-content-center">
                          <span className="h3">{item.name}</span>
                          <span className="h5">
                            Cantidad: {item.subcategory.qty}
                          </span>
                        </div>
                        <div className="col-3 d-flex align-items-center justify-content-end">
                          <span className="h2">
                            $ {item.subcategory.price * item.subcategory.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary h2"
                onClick={() => setVisible(false)}
              >
                Cerrar
              </button>
              <div id="button-checkout"                 className="h4"
 onClick={() => sendCart()}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = {
  confirmPurchase: cartActions.confirmPurchase,
};

export default connect(mapStateToProps, mapDispatchToProps)(MercadoPago);
