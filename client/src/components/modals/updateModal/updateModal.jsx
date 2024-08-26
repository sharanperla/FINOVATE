import React from "react";
import "./Modal.css";

export default function UpdateModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}