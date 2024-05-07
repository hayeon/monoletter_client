import React from "react";
import "./loading.css";

// isOpen의 타입을 명시적으로 정의하는 인터페이스
interface LoadingModalProps {
  isOpen: boolean;
}

function LoadingModal({ isOpen }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
          <div className="titlecontainer">
            <h1 className="loadingtitle">첨삭중이에요. </h1>
            <p> </p>
            <h1 className="loadingtitle"> 조금만 기다려주세요.</h1>
          </div>
      <div className="modalContent">
        <div className="typewriter">
          <div className="slide">
            <i></i>
          </div>
          <div className="paper"></div>
          <div className="keyboard"></div>
        
        </div>
      </div>
    </div>
  );
}

export default LoadingModal;
