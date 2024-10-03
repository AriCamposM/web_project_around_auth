import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({isOpen, onClose , onUpdateAvatar}){
    const avatarRef = React.useRef();
    const [isSaving, setIsSaving] = React.useState(false);
    function handleSubmit(e){
        e.preventDefault();
        setIsSaving(true);
        onUpdateAvatar({
            avatar: avatarRef.current.value
        }).then(() => {
            avatarRef.current.value = '';
            setIsSaving(false);
        }).catch((err) => {
            console.log("Error al actualizar la foto de perfil",err);
            setIsSaving(false);
        });
    }
    React.useEffect(() => {
        if (!isOpen) {
          avatarRef.current.value = ''; 
        }
      }, [isOpen]);


    return(
        <PopupWithForm
            title={"Cambiar Foto De Perfil"}
            name={"avatar"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="input-avatar" className="popup__label"></label>
            <input
                ref={avatarRef}
                type="url"
                name="avatar"
                id="input-avatar"
                className="popup__input-about popup__input"
                required
                placeholder="Link de la imagen"
                
            />
            <span
                className="popup__error input-avatar-error"
                id="input-avatar-error"
            ></span>
            <button
            className="popup__button"
            id="popup__button-avatar"
            type="submit"
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;