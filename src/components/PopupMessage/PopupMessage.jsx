import React from "react";

import "./PopupMessage.scss";

const PopupMessage = ({ error, isOpenPopup, onDismissPopupMessasge }) => {
  const cssClasses = [
    "error_message_popup",
    isOpenPopup ? "showModal" : "closeModal"
  ];
  return (
    <div className={cssClasses.join(" ")}>
      <p>{error !== null ? error.message : ''}</p>
      <button className="icon_button">
        <span onClick={onDismissPopupMessasge} className="popup_close_btn">
          x
        </span> 
      </button>
    </div>
  );
};

export default PopupMessage;
