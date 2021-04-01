import React, { useState } from "react";
import { connect } from "react-redux";
import productActions from "../redux/actions/productActions";

const ProductSubcategory = (props) => {
  const [visible, setVisible] = useState(false);
  const [editedSubcategory, setEditedSubcategory] = useState({
    subcategory: props.subcategory.subcategory,
    subcategoryPrice: props.subcategory.subcategoryPrice,
    subcategoryStock: props.subcategory.subcategoryStock,
  });

  const removeSubcategory = () => {
    props.deleteSubcategory(props.productId, props.subcategory._id);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubcategory({
      ...editedSubcategory,
      [name]: value,
      productId: props.productId,
      subcategoryId: props.subcategory._id,
    });
  };

  const sendModification = () => {
    props.editSubcategory(editedSubcategory);
  };
  return (
    <>
      <tr>
        {!visible ? (
          <td>
            <td>{props.subcategory.subcategory}</td>
            <td>{props.subcategory.subcategoryPrice}</td>
            <td>{props.subcategory.subcategoryStock}</td>
          </td>
        ) : (
          <>
            <td>
              <input
                name="subcategory"
                defaultValue={props.subcategory.subcategory}
                onChange={handleChange}
              ></input>
            </td>
            <td>
              <input
                name="subcategoryPrice"
                defaultValue={props.subcategory.subcategoryPrice}
                onChange={handleChange}
              ></input>
            </td>
            <td>
              <input
                name="subcategoryStock"
                defaultValue={props.subcategory.subcategoryStock}
                onChange={handleChange}
              ></input>
            </td>
            <div>
              <button onClick={sendModification}>Confirmar</button>
              <button onClick={() => setVisible(!visible)}>Cancelar</button>
            </div>
          </>
        )}
        <div>
          <button onClick={() => setVisible(!visible)}>Editar</button>
          <button onClick={() => removeSubcategory()}>Eliminar</button>
        </div>
      </tr>
    </>
  );
};

const mapDispatchToProps = {
  deleteSubcategory: productActions.deleteSubcategory,
  editSubcategory: productActions.editSubcategory,
};

export default connect(null, mapDispatchToProps)(ProductSubcategory);
