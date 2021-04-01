import React from "react";
import fondo4 from '../assets/fondos/fondo-4.jpg'
const Preloader = () => {
  return (
    <>
    <div className="container calendar-fondo " style={{ backgroundImage: `url(${fondo4})`, backgroundAttachment: "fixed",
      }}>
        <div className="row">
            <div className="col mx-auto text-center">
                <span className="preloader-title">Cooking in progress..</span>
                <div id="cooking">
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div class="bubble"></div>
                    <div id="area">
                        <div id="sides">
                            <div id="pan"></div>
                            <div id="handle"></div>
                        </div>
                        <div id="pancake">
                            <div id="pastry"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Preloader;
