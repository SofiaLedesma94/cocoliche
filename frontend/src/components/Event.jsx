import React, { useState } from 'react'
import { connect } from 'react-redux';
import eventsActions from '../redux/actions/eventsActions';
import { Swal } from 'sweetalert2';
import Compressor from "compressorjs";

const Event = ({title, picture, description, id, editEvent, deleteEvent, date}) => {
    const [file, setFile] = useState();
    const [pathImagen, setPathImagen] = useState("/assets/upload.png");
    const [visible, setVisible] = useState(false)
    const [eventModify, setEventModify]=useState({
        title, picture, description, date, id
    })

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
                  setPathImagen(reader.result);
                };
              },
            });
            setFile(compressedFile);
            setEventModify({
              ...eventModify,
              compressedFile,
            });
          } else {
            Swal.fire(
              "error",
              "Something went wrong!",
              "Files must be of an image type"
            );
          }
        }
      };
      console.log(eventModify)

      const captureEventModify = e => {
          const field = e.target.name
          const value = e.target.value
          setEventModify({...eventModify,
        [field]: value})
      }

      const resetFile = () => {
        setPathImagen("");
        setFile("");
      };

      const sendEditEvent = (e) => {
        e.preventDefault();
        editEvent(eventModify, file);
        setVisible(!visible);
        resetFile()
      };

    const sendDeleteEvent = e => {
        e.preventDefault()
        deleteEvent(e.target.id)
    }

    return (
        <div>
            <span>{title}</span>
            <div style={{backgroundImage: `url(${picture})`, width: '30vw', height: '30vh', backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
            <button id={id} onClick={sendDeleteEvent}>DELETE</button>
            <button id={id} onClick={() => setVisible(!visible)}>EDIT</button>
            <div>{
                visible && 
                <>
                    <input defaultValue={description} onChange={captureEventModify} name="description" type="text" />
                    <input defaultValue={title} onChange={captureEventModify} name="title" type="text" placeholder="Editar título del evento"/>
                    <input defaultValue={date} onChange={captureEventModify} name="date" type="date" placeholder="Editar fecha del evento"/>
                    <label htmlFor="file">
                        <img style={{margin:"0"}} className="img-fluid profile-pic-profile-submit" src={pathImagen} alt="event-pic" />
                    </label>    
                    <input style={{display: 'none'}} id="file" name="picture" type="file" onChange={onFileChange} />
                    <button id={id} onClick={sendEditEvent}>CONFIRM</button>
                </>
                }
            </div>

        </div>
    )
}

const mapDispatchToProps = {
    deleteEvent: eventsActions.deleteEvent,
    editEvent: eventsActions.editEvent
}
export default connect(null, mapDispatchToProps)(Event)
