import React, { useEffect } from "react";
import { connect } from "react-redux";
import orderActions from "../redux/actions/orderActions";
import axios from "axios";
import { API } from "./Api";
import Swal from "sweetalert2";

const Order = (props) => {
  const confirmOrder = () => {
    props.confirmOrder({
      orderId: props.order._id,
      customerId: props.order.customer,
    });
  };
  const cancelOrder = () => {
    props.cancelOrder(props.order._id);
  };
  const completeOrder = () => {
    props.completeOrder(props.order._id);
  };
  const getCustomerData = async () => {
    const response = await axios.get(
      `${API}/purchases/user/${props.order.customer}`
    );
    Swal.fire({
      title:
        props.order.cart.data.name + " " + response.data.response.lastname,
      text: `Telefono: ${props.order.cart.data.phone}. Direccion: ${props.order.cart.data.address}. Notas:${props.order.cart.data.addressNotes}`,
      imageUrl: response.data.response.urlPic,
      imageWidth: 100,
      imageAlt: "Custom image",
    });
  };

  console.log(props.order.cart.data);

  useEffect(() => {
    props.getOrders();
  }, []);

  switch (props.order.state) {
    case "En curso":
      var stateBg = {
        backgroundColor: "yellow",
      };
      break;
    case "Completada":
      var stateBg = {
        backgroundColor: "green",
      };
      break;
    case "Cancelada":
      var stateBg = {
        backgroundColor: "firebrick",
      };
      break;
    default:
      var stateBg = {
        backgroundColor: "orange",
      };
      break;
  }

  return (
    <>
      <td>
        {props.order.cart.cart.map((item) => (
          <p>
            {item.name} {item.subcategory.subcategory} x{item.subcategory.qty}
          </p>
        ))}
      </td>
      <td style={stateBg}>{props.order.state}</td>
      <td>
        {props.order.date.slice(5, 10)} {props.order.date.slice(11, 16)}
      </td>
      <td>{props.order.cart.data.orderNotes}</td>

      <td>
        <div className="container d-flex flex-column">
          <button
            type="button"
            className="btn-primary mb-1"
            onClick={confirmOrder}
          >
            Confirmar
          </button>
          <button
            type="button"
            className="btn-danger mb-1"
            onClick={cancelOrder}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-success mb-1"
            onClick={completeOrder}
          >
            Completar
          </button>
          <button type="button" className="btn-info" onClick={getCustomerData}>
            Datos
          </button>
        </div>
      </td>
    </>
  );
};

const mapDispatchToProps = {
  confirmOrder: orderActions.confirmOrder,
  cancelOrder: orderActions.cancelOrder,
  completeOrder: orderActions.completeOrder,
  getOrders: orderActions.getOrders,
};

export default connect(null, mapDispatchToProps)(Order);
