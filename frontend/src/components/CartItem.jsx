import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import { GrEdit, GrTrash, GrCheckmark } from "react-icons/gr";
import Swal from "sweetalert2";

const CartItem = (props) => {
  const [visible, setVisible] = useState(false);
  const [newQuantity, setNewQuantity] = useState();

  const removedItemToast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const changeQuantity = (e) => {
    setNewQuantity(e.target.value);
  };

  const confirmChanges = () => {
    props.modifyQuantity(newQuantity, props.props.subcategory.subcategoryId);
    setVisible(!visible);
  };

  let qty = 1;

  return (
    <div>
      <div className="row justify-content-around border-bottom my-2 pb-2">
        <div className="col-sm-12 col-md-7 col-lg-6 d-flex justify-content-between align-items-center">
          <img
            className="mr-2"
            src={`${props.props.picture}`}
            style={{ width: "100px", height: "100px" }}
            alt="producto"
          ></img>
          <span className="h4 text-truncate">
            {/* {props.props.name}  */}
            {props.props.subcategory.subcategory}
          </span>
        </div>
        <div className="col-sm-12 col-md-5 col-lg-6 d-flex justify-content-around">
          <div className="row">
            {visible ? (
              <select
                className="cartItemSelectCantidad px-3 align-self-center"
                name="quantity"
                style={{ fontSize: "20px" }}
                onChange={changeQuantity}
                defaultValue="default"
              >
                <option value="default">{props.props.subcategory.qty}</option>
                {[...Array(10)].map(() => {
                  return <option key={qty}>{qty++}</option>;
                })}
              </select>
            ) : (
              <p className="h5 px-3 mt-1">
                {`X ${props.props.subcategory.qty}`}{" "}
              </p>
            )}
            {visible ? (
              <span
                type="button"
                className="bg-success rounded d-flex align-items-center p-1 m-1 bnt-cart"
                onClick={confirmChanges}
              >
                <GrCheckmark />
              </span>
            ) : (
              <span
                type="button"
                class="bg-secondary rounded d-flex align-items-center p-1 m-1 bnt-cart"
                onClick={() => setVisible(!visible)}
              >
                <GrEdit />
              </span>
            )}
            <span
              type="button"
              class="bg-danger rounded d-flex align-items-center p-1 m-1 bnt-cart"
              onClick={() => {
                props.removeProduct(props.props.subcategory.subcategoryId);
                removedItemToast.fire({
                  icon: "error",
                  title: "Producto eliminado",
                });
              }}
            >
              <GrTrash />
            </span>
          </div>
        </div>
        <p className="h3">
          Subtotal: ${" "}
          <span>
            {props.props.subcategory.price * props.props.subcategory.qty}
          </span>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  // modificar cantidad
  modifyQuantity: cartActions.modifyQuantity,
  // eliminar del carrito
  removeProduct: cartActions.removeProduct,
};

export default connect(null, mapDispatchToProps)(CartItem);
