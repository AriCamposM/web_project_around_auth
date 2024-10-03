import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen ,onClose ,onAddPlaceSubmit}){
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [isSaving, setIsSaving] = React.useState(false);
    function handleSubmit(e){
        e.preventDefault();
        setIsSaving(true);
        onAddPlaceSubmit({
            name,
            link,
        }).then(() => {
          setLink('');
          setName('');
          setIsSaving(false);
      }).catch((err) => {
          console.log("Error al agregar la tarjeta",err);
          setIsSaving(false);
      });
    }
    
    React.useEffect(() => {
      if (!isOpen) {
        setLink('');
        setName('');
      }
    }, [isOpen]);

    return(
        <PopupWithForm
          name={"cards"}
          title={"Nuevo Lugar"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label htmlFor="input-name" className="popup__label"></label>
          <input
            type="text"
            className="popup__input-name popup__input"
            id="input-name"
            required
            placeholder="Nombre"
            minLength="2"
            maxLength="30"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span
            className="popup__error input-name-error"
            id="input-name-error"
          ></span>
          <label htmlFor="input-link" className="popup__label"></label>
          <input
            value={link}
            type="url"
            name="link"
            id="input-link"
            className="popup__input-about popup__input"
            required
            placeholder="Enlace a la imagen"
            onChange={(e) => setLink(e.target.value)}
          />
          <span
            className="popup__error input-link-error"
            id="input-link-error"
          ></span>
          <button
            className="popup__button"
            id="popup__button-cards"
            type="submit"
          >
            {isSaving ? 'Creando...' : 'Crear'}
          </button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;