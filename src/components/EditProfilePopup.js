import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup ({isOpen, onClose, onUpdateUser} ) {
    //Estados para cambiar la infor del usuario
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    // Obtener el usuario actual con el contexto
    const currentUser = React.useContext(CurrentUserContext);
    const [isSaving, setIsSaving] = React.useState(false);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleDescription(e){
        setDescription(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        setIsSaving(true)
        onUpdateUser({
            name,
            about: description,
        }).then(() => {
          setDescription('');
          setName('');
          setIsSaving(false);
      }).catch((err) => {
          console.log("Error editar el perfil del usuario",err);
          setIsSaving(false);
      });

        
    }
   
    React.useEffect(() => {
      if (!isOpen) {
        setDescription('');
        setName('')
      }
    }, [isOpen]);

    return(
        <PopupWithForm
          name={"profile"}
          title={"Editar Perfil"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <label htmlFor="input-name" className="popup__label"></label>
          <input
            name="name"
            type="text"
            className="popup__input-name popup__input"
            id="input-name"
            required
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            value={name}
            onChange={handleChangeName}
          />
          <span
            className="popup__error input-name-error"
            id="input-name-error"
          ></span>
          <label htmlFor="input-about" className="popup__label"></label>
          <input
            type="text"
            name="about"
            id="input-about"
            className="popup__input-about popup__input"
            required
            placeholder="Acerca de mí"
            minLength="2"
            maxLength="200"
            value={description}
            onChange={handleDescription}
          />
          <span
            className="popup__error input-about-error"
            id="input-about-error"
          ></span>
          <button
            className="popup__button"
            id="popup__button-profile"
            type="submit"
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </PopupWithForm>
    )


}



export default EditProfilePopup;