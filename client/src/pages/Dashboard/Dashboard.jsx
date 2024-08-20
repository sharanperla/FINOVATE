import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
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
        <button className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
          </svg>
          Add income
        </button>
        <button className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
          </svg>
          Add expense
        </button>
      </section>
      <div></div>
    </div>
  );
}
