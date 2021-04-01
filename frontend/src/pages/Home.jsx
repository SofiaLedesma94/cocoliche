import React from "react";
import Navbar from "../components/Navbar";
import banner_1 from '../assets/Img/banner_1.jpg'
import banner_2 from '../assets/Img/banner_2.jpg'
import banner_3 from '../assets/Img/banner_3.jpg'
import banner_4 from '../assets/Img/banner_4.jpg'


const Home = () => {
  return (
    <div className="container-fluid d-flex p-0 menu-responsive">
      <Navbar />
      <div className="container-fluid pl-1 pr-0 d-flex">
        <div className="col-sm-12 col-md-5 col-lg-5 banner-lg-home" style={{backgroundImage: `url(${banner_1})`}}>

        </div>
        <div className="col-sm-12 col-md-7 col-lg-7">
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-12 banner-md-home" style={{backgroundImage: `url(${banner_3})`}}>
                
              </div>
            </div>
            <div className="row">
              <div className="col-12  banner-sm-home" style={{backgroundImage: `url(${banner_2})`}}>
                  
              </div>
            </div>
            <div className="row">
              <div className="col-12 banner-sm-home" style={{backgroundImage: `url(${banner_4})`}}>
                  
              </div>
            </div>               
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
