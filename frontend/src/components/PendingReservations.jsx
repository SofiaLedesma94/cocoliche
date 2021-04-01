import React, { useState } from "react";
import { connect } from "react-redux";
import reservationActions from "./../redux/actions/reservationActions";

const PendingReservations = (props) => {
  const [visible, setVisible] = useState(false);
  const [newDates, setNewDates] = useState({});

  const captureNewDate = (e) => {
    const { value, name } = e.target;
    setNewDates({ ...newDates, [name]: value });
  };
  const editReservation = (e) => {
    if (!newDates.quantity && !newDates.day) {
      setVisible(!visible);
      return false;
    }
    props.editReservation({
      newDates,
      id: e.target.id,
      token: props.loggedUser.token,
    });
    setVisible(!visible);
  };
  const deleteReservation = (e) => {
    e.preventDefault();
    props.deleteReservation({
      id: e.target.id,
      token: props.loggedUser.token,
    });
  };

  return (
    <div>
      {visible ? (
        <div className="d-flex flex-column justify-content-center">
          <div className="d-flex align-items-center p-3">
            <div className="pr-3 pl-3">
              <p className="h5">Ingrese la nueva fecha</p>
            </div>
            <input
              defaultValue={props.day}
              name="day"
              onChange={captureNewDate}
              type="date"
            />
            <div className="pr-3 pl-3">
              <p className="h3">Ingrese la nueva cantidad</p>
            </div>
            <input
              onChange={captureNewDate}
              name="quantity"
              type="number"
              defaultValue={props.quantity}
            />
          </div>
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn-success pl-5 pr-5 pt-1 pb-1"
              id={props._id}
              onClick={editReservation}
            >
              Enviar
            </button>
            <button
              type="button"
              className="btn-danger pl-5 pr-5 pt-1 pb-1"
              id={props._id}
              onClick={() => setVisible(!visible)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-around p-3">
            <div>
              <p className="h3">DÍA </p>
              <p className="h3 text-warning">{props.day}</p>
            </div>
            <div>
              <p className="h3">Sillas reservadas: </p>
              <p className="h3 text-secondary">{props.quantity}</p>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn-info pl-5 pr-5 pt-1 pb-1"
              onClick={() => setVisible(!visible)}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn-danger pl-5 pr-5 pt-1 pb-1"
              id={props._id}
              onClick={deleteReservation}
            >
              Elimiar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
  };
};

const mapDispatchToProps = {
  editReservation: reservationActions.editReservation,
  deleteReservation: reservationActions.deleteReservation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingReservations);
