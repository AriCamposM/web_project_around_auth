import React from "react";
import closeButton from "../images/Close__Icon.png";
function PopupWithForm({ title,name,isOpen,onClose,onSubmit,children, }){

    const popupClassName = `popup ${isOpen ? 'popup_opened' : ''}`;

    return(
        <div className={popupClassName} id={`popup-${name}`} onClick={(event) => {
            if(event.target.classList.contains("popup_opened")){
                onClose()
            }
        }}>
            <form className="popup__form" noValidate onSubmit={onSubmit}>
                <div className="popup__container">
                    <img
                        className="popup__close-button"
                        src={closeButton}
                        alt="Close Button"
                        onClick={onClose}
                    />
                    <p className="popup__title">{title}</p>
                    {children}
                </div>
            </form>
        </div>
    )
}

export default PopupWithForm;