import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../App.scss";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // for selectable
import eventsActions from "../redux/actions/eventsActions";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import fondo5 from '../assets/fondos/fondo-5.jpg'


const Calendary = (props) => {
  const [events, setEvents] = useState([])
 const {getEvents, allEvents } = props

  useEffect( () => {  
    getEvents();
  
  }, []);
  useEffect(() => {
      setEvents(allEvents)
  }, [allEvents])

  const eventos = events.map(event => {
    return (
      event = {
        id: event._id,
        title: event.title,
        start: event.dateEvent,
        picture: event.picture
      }
    )
  })
  const handleDateClick = (arg) => {
    events.map(event => {
      if (event.dateEvent === arg.dateStr) {
        Swal.fire({
          title: event.title,
          text: '',
          imageUrl: event.picture,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showCancelButton: true,
          confirmButtonText: 'Pedir reserva',
          cancelButtonText: 'Cerrar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            if(props.loggedUser) {
              Swal.fire({
                html: 
                '<span>Cantidada de sillas a reservar</span>'+
                '<input type="number" id="swal-input2" class="swal2-input">',
                showCancelButton: true,
                cancelButtonText: 'Holaa'
              }).then((result)=>{
                if (result.value !== "") {
                  Swal.fire({
                    icon:'success',
                    title:'Recibira un mail con la confirmacion',
                  })
                } else {
                  Swal.fire({
                    icon:'error',
                    title:'No puso cantidad de personas',
                  })
                }
              })
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Debe registrarse primero',
                footer: '<div class="d-flex align-items-center"><p>tienes cuenta?</p></div><div class="d-block"><button class="btn btn-primary">Registrarse</button></div>'
              })

            }
          }
        })

      } 
    })
  }

  
  return (
    <div className="container-fluid d-flex p-0 menu-responsive cart-fondo" style={{backgroundImage: `url(${fondo5})`}}>
      <Navbar />
        <div className="container-fluid px-5 my-auto mb-3" >
          <FullCalendar
            plugins={[interactionPlugin, dayGridPlugin, bootstrapPlugin]}
            locale="es-ES"
            themeSystem = 'bootstrap'
            customButtons= {{
              myCustomButton: {
                icon: 'fa-times',
                text:"Ver eventos",
                click: function() {
                    Swal.fire({
                      html: eventos.map(event =>
                        '<div class="card bg-dark text-white">'+
                          `<img class="card-img" src=${event.picture} alt="Card image"/> ` +
                            '<div class="card-img-overlay">'+
                              `<h5 class="card-title">${event.title}</h5>` +
                              '<p class="card-text"></p>'+
                              `<p class="card-text">${event.start}</p>` +
                          '</div>'+
                        '</div>')
                    })
                  
                }
              },
            }}
            headerToolbar= {{
              end: 'myCustomButton'
            }}
            selectable={true}
            events= {eventos}
            dayMaxEvents={true}
            dateClick={handleDateClick}   
            contentHeight={500}
          />
        </div>
    </div>   
  )
}


const mapStateToProps = state => {
  return {
    allEvents: state.eventR.events,
    loggedUser: state.authReducer.loggedUser,
  }
}   

const mapDispatchToProps = {
  getEvents: eventsActions.getEvents
}
export default connect(mapStateToProps,mapDispatchToProps)(Calendary);
