import React from "react";

const Purchases = (props) => {
  console.log(props);
  return (
    <div className="mb-3 pt-3 ">
      {props.purchase.cart.map((item) => (
        <div className="d-flex justify-content-between">
          <div>
            <p>
              {item.name} {item.subcategory.subcategory} x{item.subcategory.qty}
            </p>
          </div>
          <div>
            <p>{item.subcategory.price * item.subcategory.qty}</p>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between border-top">
        <p className="h3">TOTAL:</p>
        <p className="h3">{props.purchase.total}</p>
      </div>
    </div>
  );
};

export default Purchases;
