import React from "react";
import "./HomePage.css";
import { useNavigate } from 'react-router-dom'; 

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homeContainer">
    
  <div className="container">
    <div className="content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2GdeSRQ2DaXkzpYev3bYRSbNmB5Kpo16Ug&s" alt="Finovate"  className='finovateIcon'/>
      <form className="content__form">
        <div className="content__inputs">
          <label>
            <input required="" type="text" placeholder="Email" />
          </label>
          <label>
            <input required="" type="password" placeholder="Password"  />
          </label>
        </div>
        <button onClick={()=>navigate("/Dashboard")}>Log In</button>
      </form>
      <div className="content__or-text">
        <span />
        <span>OR</span>
        <span />
      </div>
      <div className="content__forgot-buttons">
        <button>
          <span>
            <svg
              className=""
              xmlSpace="preserve"
              style={{ enableBackground: "new 0 0 512 512" }}
              viewBox="0 0 408.788 408.788"
              y={0}
              x={0}
              height={512}
              width={512}
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  className=""
                  data-original="#475993"
                  fill="#475993"
                  d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 0 1-8.954-8.92l-.182-47.087a8.955 8.955 0 0 1 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 0 1 8.955 8.955v39.704a8.955 8.955 0 0 1-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 0 1-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z"
                />
              </g>
            </svg>
          </span>
          <span>Log in with Facebook</span>
        </button>
          <button>
            Dont have an account? signup
          </button>
      </div>
    </div>
  </div>
    </div>
  );
}