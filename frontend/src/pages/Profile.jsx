import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../components/Navbar";
import PendingReservations from "../components/PendingReservations";
import Purchases from "../components/Purchases";
import reservationActions from "../redux/actions/reservationActions";

const Profile = (props) => {
  const [reservated, setReservated] = useState({});
  const { reservations } = props;

  useEffect(() => {
    props.getReservations();
  }, []);

  useEffect(() => {
    setReservated(
      reservations.length > 0 &&
        reservations.filter(
          (reservation) =>
            reservation.customer._id === props.loggedUser._id && reservation
        )
    );
  }, [reservations]);

  //console.log(props.loggedUser.purchases)
  return (
    <div className="d-flex">
      <Navbar />
      <div className="bg-dark p-5 w-100">
        <div className="row border rounded p-3">
          <div className="col-10 text-center mx-auto">
            <h2 className="text-white">Tu perfil</h2>
            <div className="text-white border-top border-bottom pl-5 pr-5 pt-3 pb-3">
              <div className="d-flex justify-content-center">
                <p className="h3 text-secondary">Tus reservas</p>
              </div>
              {reservated.length ? (
                reservated.map((res) => {
                  return (
                    !res.info && (
                      <div key={res._id}>
                        <PendingReservations
                          _id={res._id}
                          day={res.day}
                          quantity={res.quantity}
                        />
                      </div>
                    )
                  );
                })
              ) : (
                <div className="d-flex justify-content-center">
                  <p className="h4 text-muted">No tienes reservas</p>
                </div>
              )}
            </div>
            <div className="text-white pl-5 pr-5 pt-3 pb-3">
              <div className="d-flex justify-content-center">
                <h3 className="h3 text-secondary">Tus compras</h3>
              </div>
              {props.loggedUser.purchases ? (
                props.loggedUser.purchases.map(
                  (purchase) =>
                    purchase.confirmed && <Purchases purchase={purchase} />
                )
              ) : (
                <div className="d-flex justify-content-center">
                  <p className="h3 text-muted">No tiene compras todavía</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authReducer.loggedUser,
    reservations: state.reservationsR.reservations,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = {
  getReservations: reservationActions.getReservations,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
