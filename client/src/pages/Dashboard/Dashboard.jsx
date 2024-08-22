import React from "react";
import "./Dashboard.css";
import Button1 from "../../components/button/Button1";
import DesktopNav from "../../components/navigation/DesktopNav";
import Modal from "../../components/modals/Modal";

export default function Dashboard() {
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIU7E3x2EYvNYP_dM2NVGvkBLsNT0_P6B1w&s"
            alt=""
            className="userIcon"
          />
          <p>sharan sharan sharan sharan</p>
        </div>
      </section>
      <section className="section2">
        <Button1/>
        <Button1/>
      </section>
      <div></div>
    </div>
    <div className="modalDemo">
     <Modal/>
    </div>
    </div>
  );
}
