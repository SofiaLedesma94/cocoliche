import React, { useState } from 'react'
import eventsActions from './../redux/actions/eventsActions';
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import Compressor from "compressorjs";
import Event from './Event';

const CreateEvent = (props) => {

    const [file, setFile] = useState();
    const [pathImage, setPathImage] = useState("/assets/upload.png");
    const errorAlert = (type, title, text) => {
        Swal.fire({
          icon: type,
          title: title,
          text: text,
          confirmButtonText: "Ok",
        });
      };

      const resetFile = () => {
        setPathImage("");
        setFile("");
      };

    const [newEvent, setNewEvent] = useState({})

    const captureNewEvent = e => {
        const field = e.target.name
        const value = e.target.value
        setNewEvent({
            ...newEvent,
            [field]: value
        })
    }

    const enviarEvento = (e) => {
        e.preventDefault()
        e.stopPropagation();
        if(newEvent.length === undefined && file === undefined){
          errorAlert("error","All fields are required" )
          return false
        }
        if(!newEvent.description || !newEvent.date || !newEvent.title){
          errorAlert("error","All fields are required" )
          return false
        }
        props.newEvent(newEvent, file);
        resetFile()

     }

     const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
    
          if (file.type.includes("image")) {
            //SE COMPRIME LA FOTO DE UNA PETICIÓN PARA QUE NO SEA MUY GRANDE
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
            errorAlert("error", "Something went wrong");
          }
        } else {
          errorAlert("error", "Petition must have a picture");
        }
      };



    return (
        <div className="d-flex flex-column mx-auto">
            <span className="h1">Crear Evento</span>
            <input type="text" name="title" onChange={captureNewEvent} placeholder="Titulo del evento"/>
            <input type="date" name="date" onChange={captureNewEvent}  placeholder="Fecha del evento"/>
            <input type="text" name="description" onChange={captureNewEvent}  placeholder="Descripción"/>
            <label htmlFor="inputUpload">
                <img style={{margin:"0"}} className="img-fluid profile-pic-profile-submit" src={pathImage} alt="event-pic" />
            </label>    
            <input id="inputUpload" name="picture" type="file" onChange={onFileChange} />
            <span onChange={captureNewEvent}>
                <select name="category" id="categoria">
                <option disabled selected>--</option>
                <option value="Comida">Comida</option> 
                <option value="Bebida">Bebida</option>
                <option value="Cantante">Cantante</option>
                <option value="Comedia">Comedia</option>
               
            </select>
            </span>
            <button onClick={enviarEvento}>Enviar</button>
            <h3>Lista de próximos eventos</h3>
            <div>{
                props.allEvents.map(({title, _id, picture, description, date}) => 
              
               { return <span key={_id}><Event title={title} picture={picture} id={_id} description={description} date={date} /></span>}
                )

                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
  return {
    allEvents: state.eventR.events
  }
}

const mapDispatchToProps = {
    newEvent: eventsActions.newEvent
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)