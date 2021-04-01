import React, { useState } from "react";
import Navbar from "../components/Navbar";
import fondo3 from "../assets/fondos/fondo-3.jpg";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const alertUser = () => {
    if (
      !contact.name.length ||
      !contact.email.length ||
      !contact.phone.length ||
      !contact.msg.length
    ) {
      Swal.fire({
        title: "Uh!",
        text: "Debés completar todos los campos primero.",
        icon: "error",
        confirmButtonText: "Ok!",
      });
    } else {
      Swal.fire({
        title: "Gracias!",
        text:
          "Recibimos tu consulta y estaremos respondiéndote a la brevedad. 😉",
        icon: "success",
        confirmButtonText: "Ok!",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };
  console.log(contact);
  return (
    <div className="container-fluid d-flex p-0 menu-responsive ">
      <Navbar />
      <div
        className="container calendar-fondo "
        style={{ backgroundImage: `url(${fondo3})` }}
      >
        <div className="row justify-content-center align-items-center p-5">
          <div className="col-sm-12 col-md-8 col-lg-5 col-xl-5 trasparent text-center mx-auto my-auto">
            <Form>
              <Form.Group
                className="mt-3"
                md="6"
                controlId="validationCustom03"
              >
                <Form.Label>Nombre y Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group md="6" controlId="validationCustom03">
                <Form.Label>telefono</Form.Label>

                <Form.Control
                  type="phone"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Motivo de consulta</Form.Label>
                <Form.Control as="select" placeholder="Selecionar">
                  <option>ventas</option>
                  <option>recursos humanos</option>
                  <option>atencion al cliente</option>
                  <option>reclamos de calidad</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{ resize: "none" }}
                  onChange={handleChange}
                  name="msg"
                />
              </Form.Group>
              <Button
                className="mb-3"
                variant="primary"
                type="submit"
                onClick={() => alertUser()}
              >
                Enviar
              </Button>
            </Form>
          </div>

          <div className="col-sm-12 col-md-8 col-lg-5 col-xl-5 trasparent mx-auto my-auto p-3">
            <iframe
              title="Este lomo te va a volar la bocha"
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/ghM0aBOvDVE"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h4 className="mt-3">Teléfonos</h4>
            <p>0223 481 8202 / 410 9133 / 410 9169 / 4644812</p>
            <p>contacto@cocoliche.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
