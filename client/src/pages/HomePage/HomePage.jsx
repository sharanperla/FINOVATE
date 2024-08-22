import React, { useState } from "react";
import "./HomePage.css";

import SignUpCard from "../../components/signInCard/SignUpCard";
import SignInCard from "../../components/SignInCard/SignInCard";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function HomePage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  return (
    <div className={`homeContainer ${isFlipped ? "flipped" : ""}`}>
      <div className="innerContainer">
        <div className="container">
      <SignInCard handleFlip={handleFlip}/>
       <SignUpCard handleFlip={handleFlip} />
        </div>
      <ToastContainer  />
      </div>
    </div>
  );
}