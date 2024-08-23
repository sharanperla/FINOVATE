import React, { useState } from "react";
import "./Dashboard.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import Modal from "../../components/modals/Modal";

export default function Dashboard() {

  const [modalOpen,setModalOpen]= useState(false);

  return (
    <div className="mainContainer">
     <DesktopNav />
    <div className="dashboardContainer">
      <section className="section1">
        <div className="welcomeText">
          <h1>Welcome to,Finovate!</h1>
          <p>where your journey to financial brilliance begins!</p>
        </div>
        <div className="userProfile">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s"
            alt=""
            className="userIcon"
          />
          <div className="userDesc">
            <span>Sharan kumar</span>
            <p>shranperla@gmail.com</p>
          </div>
        </div>
      </section>
      <section className="section2">
        <Button1 handleClick={() => setModalOpen(true)} />
      </section>
      <div></div>
    </div>
    <div className="modalDemo">
    {modalOpen && <Modal handleClose={() => setModalOpen(false)} />}
    </div>
    </div>
  );
}
