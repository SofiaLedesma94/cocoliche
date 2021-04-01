import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MenuItem from "../components/MenuItem";
import Preloader from "../components/Preloader";
import productActions from "../redux/actions/productActions";
import cartActions from "../redux/actions/cartActions";
import Navbar from "../components/Navbar";
import fondo1 from "../assets/fondos/fondo-1.jpg";
import fondotodas from "../assets/fondos/fondo-todas.jpg";
import fondoentradas from "../assets/fondos/fondo-entradas.jpg";
import fondoplatos from "../assets/fondos/fondo-platos.jpg";
import fondogaseosas from "../assets/fondos/fondo-gaseosas.jpg";
import fondotragos from "../assets/fondos/fondo-tragos.jpg";
import fondopostres from "../assets/fondos/fondo-postres.jpg";

const Menu = (props) => {
  const { getProducts, getCart } = props;
  const [checked, setChecked] = useState("todos");
  const [preloader, setPreloader] = useState(false);
  let filteredMenu = [];

  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  async function fetch() {
    await getProducts();
    getProducts();
    setPreloader(true);
  }

  console.log(checked)

  switch (checked) {
    case "todos":
      props.allProducts.map((product) => filteredMenu.push(product));
      break;
    case "entrada":
      props.allProducts.map(
        (product) =>
          product.category === "entrada" && filteredMenu.push(product)
      );
      break;
    case "principal":
      props.allProducts.map(
        (product) =>
          product.category === "principal" && filteredMenu.push(product)
      );
      break;
    case "gaseosas":
      props.allProducts.map(
        (product) =>
          product.category === "gaseosas" && filteredMenu.push(product)
      );
      break;
    case "tragos":
    props.allProducts.map(
      (product) =>
        product.category === "tragos" && filteredMenu.push(product)
    );
    break;
    case "postre":
      props.allProducts.map(
        (product) => product.category === "postre" && filteredMenu.push(product)
      );
      break;
    default:
      filteredMenu = props.allProducts;
  }

  return (
    <>
    <div className="container-fluid d-flex p-0 menu-responsive">
      <Navbar />
      {preloader ? (
        <>
          
            <div className="container-fluid px-0 d-flex flex-column calendar-fondo"style={{ backgroundImage: `url(${fondo1})`, backgroundAttachment: "fixed",
      }}>
              
              <h2 className="text-center pt-4 color-white">Hoy Cocina Cocoliche</h2>
              <h4 className="text-center color-white">Conocé nuestras especialidades</h4>
              
              <div className="col-12 mx-auto">
                <div className="row">
                  <div className="col-12 d-flex justify-content-center align-items-center">
                    <form className="row justify-content-center">
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="todos"
                          value="todos"
                          defaultChecked={true}
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="todos" style={{ backgroundImage: `url(${fondotodas})`}}>
                          <span className="form-check-text mx-auto">Todas</span> 
                        </label>
                      </div>
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="entrada"
                          value="entrada"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="entrada" style={{ backgroundImage: `url(${fondoentradas})`}}>
                          <span className="form-check-text mx-auto">Entradas</span> 
                        </label>
                      </div>
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="principal"
                          value="principal"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="principal" style={{ backgroundImage: `url(${fondoplatos})`}}>
                          <span className="form-check-text mx-auto">Platos Principales</span>
                        </label>
                      </div>
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="gaseosas"
                          value="gaseosas"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="gaseosas" style={{ backgroundImage: `url(${fondogaseosas})`}}>
                          <span className="form-check-text mx-auto">Gaseosas</span>
                        </label>
                      </div>
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="tragos"
                          value="tragos"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="tragos" style={{ backgroundImage: `url(${fondotragos})`}}>
                          <span className="form-check-text mx-auto">Tragos</span>
                        </label>
                      </div>
                      <div className="m-1">
                        <input
                          name="filterOption"
                          type="radio"
                          className="form-check-input"
                          id="postre"
                          value="postre"
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="postre" style={{ backgroundImage: `url(${fondopostres})`}}>
                          <span className="form-check-text mx-auto">Postres</span>
                        </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto">
                    <div className="row justify-content-center">
                      {filteredMenu.map((product) => (
                        <MenuItem key={product._id} product={product} props={props.history} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
      ) : (
        <Preloader />
      )}
      
    </div>
   
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.productR.allProducts,
  };
};

const mapDispatchToProps = {
  getCart: cartActions.getCart,
  getProducts: productActions.getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
