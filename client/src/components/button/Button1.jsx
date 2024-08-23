import React from 'react'
import './Button1.css'

export default function Button1({handleClick}) {
  return (
    <button className="button" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.25rem"
            height="1.25rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M12 19v-7m0 0V5m0 7H5m7 0h7"></path>
          </svg>
          Add new
</button>
  )
}


