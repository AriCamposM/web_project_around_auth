import React from "react";
import closeButton from "../images/Close__Icon.png";
function PopupWithConfirmation({ title,name,isOpen,onClose}){

    const popupClassName = `confirm ${isOpen ? 'confirm_opened' : ''}`;

    return(
        <div className={popupClassName} id={`popup-${name}`} onClick={(event) => {
            if(event.target.classList.contains("confirm_opened")){
                onClose()
            }
        }}>
            <form className="confirm__form" noValidate>
                <div className="confirm__container">
                    <img
                        className="confirm__close-button"
                        src={closeButton}
                        alt="Close Button"
                        onClick={onClose}
                    />
                    <p className="confirm__title">{title}</p>
                    <button
                        className="confirm__button"
                        id="confirm__button-delete"
                        type="submit"
                     >
                        Sí
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PopupWithConfirmation;