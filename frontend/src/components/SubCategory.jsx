import { useState } from "react";
import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import { RiShoppingCart2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const SubCategory = (props) => {
  const [productToAdd, setProductToAdd] = useState({
    picture: props.picture,
    productId: props.sub._id,
    name: props.sub.subcategory,
    subcategory: {
      price: props.sub.subcategoryPrice,
      qty: 1,
      stock: props.sub.subcategoryStock,
      subcategory: props.sub.subcategory,
      subcategoryId: props.sub._id,
    },
  });

  const addToCartToast = Swal.mixin({
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

  let qty = 1;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = JSON.parse(value);
    setProductToAdd({
      ...productToAdd,
      [name]: newValue,
      name: props.name,
    });
  };

  const addToCart = () => {
    props.addToCart(productToAdd);
    addToCartToast.fire({
      icon: "success",
      title: "Producto añadido!",
    });
  };

  return (
    <div className="d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-around mt-2">
        <h3>$ {props.sub.subcategoryPrice}</h3>
        <div>
          <label htmlFor={props.sub._id} className="h5">
            Cantidad:{" "}
          </label>
          <select
            id={props.sub._id}
            name="subcategory"
            onChange={handleChange}
            defaultValue="default"
            className="menuCardBodyTextSelectCantidad px-4"
          >
            {[...Array(10)].map(() => {
              return (
                <option
                  value={JSON.stringify({
                    subcategory: props.sub.subcategory,
                    price: props.sub.subcategoryPrice,
                    subcategoryId: props.sub._id,
                    qty,
                    stock: props.sub.subcategoryStock,
                  })}
                >
                  {qty++}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="addCart">
        <span
          className="addCartInner d-flex justify-content-center align-items-center"
          onClick={addToCart}
          style={{ cursor: "pointer" }}
        >
          Agregar al Carrito
          <RiShoppingCart2Line />
        </span>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addToCart: cartActions.addToCart,
};

export default connect(null, mapDispatchToProps)(SubCategory);
