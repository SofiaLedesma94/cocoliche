import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import productActions from "../redux/actions/productActions";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import ProductSubcategory from "./ProductSubcategory";

const Product = (props) => {
  const [visible, setVisible] = useState(false);
  const [visibleSub, setVisibleSub] = useState(false);
  const [editProduct, setEditProduct] = useState({
    name: props.product.name,
    price: props.product.price,
    category: props.product.category,
    delay: props.product.delay,
    stock: props.product.stock,
    description: props.product.description,
    picture: props.product.picture,
    id: props.product._id,
  });
  const [pathImage, setPathImage] = useState("/assets/losago.png");
  const [file, setFile] = useState();
  const [subCategory, setSubCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState({});

  useEffect(() => {
    props.getProducts();
  }, []);

  // *****************************************
  // EDICION DE PRODUCTOS
  // CAPTURA INPUTS DE EDICION DE PRODUCTO
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  // SHORTCUT PARA ALERTAS DE ERROR
  const errorAlert = (type, title, text) => {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonText: "Ok",
    });
  };

  // ENVIA CAMBIOS A BASE DE DATOS
  const sendEdit = () => {
    let newFile = file ? file : props.product.picture;
    props.editProduct(editProduct, newFile);
    setVisible(!visible);
  };

  // FUNCION PARA CAPTURAR FILES (FOTOS)
  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.includes("image")) {
        const compressedFile = new Compressor(file, {
          quality: 0.5,
          success(result) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = function load() {
              setPathImage(reader.result);
            };
          },
        });
        setFile(compressedFile);
      } else {
        errorAlert(
          "error",
          "Something went wrong!",
          "Files must be of an image type"
        );
      }
    }
  };
  // *****************************************
  // FIN EDICION DE PRODUCTOS

  // *****************************************
  // EDICION DE SUBCATEGORIAS

  const addSubcategory = () => {
    setVisibleSub(!visibleSub);
    subCategories.push(subCategory);
  };

  // const handleSubcategory = (e) => {
  //   // subcategory
  //   const { name, value } = e.target;
  //   setSubCategory({ ...subCategory, [name]: value });
  // };

  // const aceptarModif = (subCat, id) => {
  //   subCategories.map((subcategory) => {
  //     if (subcategory.id === id) {
  //       return (subcategory = subCat);
  //     }
  //     return subcategory;
  //   });
  // };

  // const confirmChanges = () => {
  //   props.addSubcategories(subCategories, props.product._id);
  // };

  const handleNewSubcategory = (e) => {
    // subcategory
    const { name, value } = e.target;
    setNewSubcategory({ ...newSubcategory, [name]: value });
  };

  const addNewSubcategory = () => {
    props.addSubcategories(newSubcategory, props.product._id);
  };

  return (
    <>
      {!visible ? (
        <>
          <tr>
            <td>{props.product.name}</td>
            <td>{props.product.category}</td>
            <td>{props.product.description}</td>
            <td>{props.product.delay}</td>
            <td>
              <img
                src={`${props.product.picture}`}
                style={{ width: "100px", height: "100px" }}
                alt="Product"
              ></img>
            </td>
            <td>
              <button onClick={() => setVisible(!visible)}>Editar</button>
            </td>
            <td>
              <button onClick={(e) => props.remove(e, props.product._id)}>
                Borrar
              </button>
            </td>
          </tr>
        </>
      ) : (
        <>
          {" "}
          <td>
            <input
              type="text"
              name="subcategory"
              onChange={handleChange}
              defaultValue={props.product.name}
            />
          </td>
          <td>
            <input
              type="subcategoryPrice"
              name="category"
              onChange={handleChange}
              defaultValue={props.product.category}
            />
          </td>
          <td>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              defaultValue={props.product.description}
            />
          </td>
          <td>
            <input
              type="text"
              name="delay"
              onChange={handleChange}
              defaultValue={props.product.delay}
            />
          </td>
          <td>
            <img
              src={`${editProduct.file}`}
              style={{ width: "100px", height: "100px" }}
              alt="a"
            ></img>
            <img
              src={`${pathImage}`}
              style={{ width: "100px", height: "100px" }}
              alt="a"
            ></img>
            <input type="file" name="picture" onChange={onFileChange} />
          </td>
          <button onClick={() => sendEdit()}>ENVIAR</button>
          <button onClick={() => setVisible(!visible)}>CANCELAR</button>
        </>
      )}
      {visibleSub && (
        <td colspan={7}>
          <tr>
            {props.product.subcategories.map((subcategory) => (
              <ProductSubcategory
                subcategory={subcategory}
                productId={props.product._id}
                key={props.product._id}
              />
            ))}
          </tr>
          <td>
            <input
              type="text"
              name="subcategory"
              onChange={handleNewSubcategory}
              placeholder="Nombre de la subcategoria"
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryPrice"
              onChange={handleNewSubcategory}
              placeholder="Precio"
            />
          </td>
          <td>
            <input
              type="number"
              name="subcategoryStock"
              onChange={handleNewSubcategory}
              placeholder="Stock disponible"
            />
          </td>
          <button onClick={addNewSubcategory}>Agregar Subcategoria</button>
          {/* <button onClick={confirmChanges}>Confirmar cambios</button> */}
        </td>
      )}
      <tr>
        <td className="bg-dark" colspan="7">
          <button
            onClick={() => {
              setVisibleSub(!visibleSub);
            }}
          >
            Ver subcategorias
          </button>
        </td>
      </tr>
    </>
  );
};

const mapDispatchToProps = {
  getProducts: productActions.getProducts,
  deleteProduct: productActions.deleteProduct,
  editProduct: productActions.editProduct,
  addSubcategories: productActions.addSubcategories,
};

export default connect(null, mapDispatchToProps)(Product);
