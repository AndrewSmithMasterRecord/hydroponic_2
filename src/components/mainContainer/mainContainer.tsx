import React from "react";
import Header from "../header/header";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const MainContainer:React.FunctionComponent = (props) => {
  return <div className="wrapper">
    <Header/>
    <Navbar/>
    <div className="content-wrapper">
      {props.children}
    </div>
    <Footer/>
  </div>
}

export default MainContainer;