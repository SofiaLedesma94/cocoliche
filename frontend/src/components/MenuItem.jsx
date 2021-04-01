import React, { useState, useEffect } from "react";
import SubCategory from "./SubCategory.jsx";
import Rating from "react-rating";
import productActions from "../redux/actions/productActions.js";
import { connect } from "react-redux";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Swal from "sweetalert2";
import { IconContext } from "react-icons"
const MenuItems = (props) => {
  const [displaySubcategory, setDisplaySubcategory] = useState([]);
  const [filteredDisplaySubcategory, setFilteredDisplaySubcategory] = useState([
    props.product.subcategories[0],
  ]);
  useEffect(() => {
    setDisplaySubcategory(props.product.subcategories);
  }, []);

  const display = (_id) => {
    setFilteredDisplaySubcategory(
      displaySubcategory.filter((subcategory) => {
        return subcategory._id === _id;
      })
    );
  };
  const handleChange = (e) => {
    if (!props.loggedUser) {
      Swal.fire("Ingresa a tu Cuenta para poder calificar");
      props.props.push("/login");
    } else {
      props.rateProduct(e, props.product._id, props.loggedUser.token);
    }
  };

  let arr = [];

  props.product.rating.map((rating) => arr.push(rating.value));

  if (arr.length) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var avgRating = arr.reduce(reducer) / arr.length;
  }

  return (
    <div className="col-sm-11 col-md-6 col-lg-4 col-xl-3 m-4">
      <div className="d-flex flex-column">
        <div
          className="menuCardImg"
          style={{ backgroundImage: `url(${props.product.picture})` }}
        >
          <div className="trasparent-light menuCardRating d-flex justify-content-center align-items-center pb-1">
            <Rating
              fractions={2}
              onChange={handleChange}
              placeholderRating={avgRating}
              emptySymbol={
              <IconContext.Provider value={{color: 'black',  opacity: 1}}>
              <AiOutlineStar className="icon emptyStar" />
              </IconContext.Provider>}
              placeholderSymbol={
                <AiFillStar className="icon placeholderStar" />
              }
              fullSymbol={<AiFillStar className="icon fullStar" />}
              className="p-0 m-0"
            />
          </div>
        </div>
        <div className="menuCardBody">
        {/* <div className="d-flex pl-1 pt-1 border-top"> */}
        <h3 className="text-center my-2 menuCardTitle">{props.product.name}</h3>
      {/* </div> */}
          {props.product.subcategories.length === 1 ? (
            <span className="menuCardBodyText">
              {props.product.subcategories[0].subcategory}
            </span>
          ) : (
            <select
              className="menuCardBodyTextSelect"
              onChange={(e) => display(e.target.value)}
              on
            >
              {props.product.subcategories.map((sub) => {
                return (
                  <option className="menuCardBodyTextSelect" value={sub._id}>
                    {sub.subcategory}
                  </option>
                );
              })}
            </select>
          )}

          {filteredDisplaySubcategory.length !== 0 &&
            filteredDisplaySubcategory.map((sub) => (
              <>
                <SubCategory
                  sub={sub}
                  picture={props.product.picture}
                  name={props.product.name}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  rateProduct: productActions.rateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
