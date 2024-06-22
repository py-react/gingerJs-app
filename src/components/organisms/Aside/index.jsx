import React from "react";

const AsideWindow = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <>
      <dialog
        id="sliderDialog"
        className={`${isOpen ? "open" : ""}`}
        open={isOpen}
      >
        {children}
      </dialog>
      {isOpen && <div id="overlay" onClick={onClose}></div>}
    </>
  );
};

export default AsideWindow;
