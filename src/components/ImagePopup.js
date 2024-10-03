import React from "react";
import closeButton from "../images/Close__Icon.png";
function ImagePopup ({image, onClose}){

    
    
    return(

        <div className={`viewer ${image ? 'viewer_opened' : ''}`} onClick={(event) => {
            if(event.target.classList.contains("viewer_opened")){
                onClose()
            }
        }}>
            <div className="viewer__container">
                <img src={closeButton} alt="Close Button" className="viewer__close" onClick={onClose}/>
                <img src={image.link} alt="Viewer" className="viewer__image" />
                <p className="viewer__text">{image.name}</p>
            </div>
        </div>

    )
}

export default ImagePopup;