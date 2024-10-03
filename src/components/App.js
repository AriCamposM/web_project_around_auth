import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithConfirmation from "./PopupWithConfirmation";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import Register from "./Register";
import Login from "./Login";

import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth.js';
import { CurrentUserEmailContext } from "../contexts/CurrentUserEmailContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  
  const [currentEmail, setCurrentEmail] = React.useState('');

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  const handleLogIn = () => {
    setIsLoggedIn(true);
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/signin');
  }

  

  const handleMenuButtonClick = () => {
    console.log("Menu Mobile Funciona");
    setIsMenuOpen(!isMenuOpen);
  }

  const handleEditProfileClick = () => {
    console.log("Editar Funciona");
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    console.log("Funciona Agregar Tarjeta");
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    console.log("Avatar Funciona");
    setIsEditAvatarPopupOpen(true);
  };

  const handleConfirmationClick = () => {
    console.log("Icono borrar funciona");
    setIsConfirmationPopupOpen(true);
  };

  const handleCardClick = (image) => {
    console.log("Tarjeta seleccionada:", image);
    setSelectedCard(image);
  };

  const handleUpdateUser = (userData) => {
    return api
    .updateUserInfo(userData)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error al actualizar el perfil del usuario: ", err);
    });
  }

  function handleUpdateAvatar(avatarData){
    return api
    .updateAvatar(avatarData.avatar)
    .then((updatedUserData) => {
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log("Error al actualizar la imagen del usuario: ", err);
    });
  }

  function handleTokenCheck () {
    if(localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');

      auth.checkToken(token).then((res) => {

        if (res) {
          handleLogIn();
          navigate('/')
          setCurrentEmail(res);
          console.log(currentEmail)
        }
      })
    }
  }

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null);
  };

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("Error al obtener la información del Usuario", err);
      });
  }, []);


  //Tarjetas
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const likeAction = isLiked
      ? api.removeLike(card._id)
      : api.addLike(card._id);

    likeAction
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  
  function handleCardDelete (card) {
    api
      .deleteCard(card._id)
      .then(()=>{
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err)=>{
        console.log(`Error al eliminar la tarjeta: ${err}`);
      })
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.error("Error al obtener las tarjetas:", err);
      });
  }, []);

  //Agregar Tarjeta Submit
  
  function handleAddPlaceSubmit(newCard) {
    return api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Error al agregar una nueva tarjeta: ", err);
      });
  }

  //jwt verificar al montar :D

  React.useEffect(() => {
    handleTokenCheck();
  }, [])


  return (
    <div className="page">
      <CurrentUserEmailContext.Provider value={currentEmail}>
      <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/signup" element={<Register/>} />

        <Route path="/signin" element={<Login setCurrentEmail={setCurrentEmail} handleLogIn={handleLogIn}/>} />
        
        

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />} >
          
          <Route 
          path="/*"
          element={
            <>
            <Header
              onMenuClick={handleMenuButtonClick}
              isOpen={isMenuOpen}
              handleLogOut={handleLogOut}
            />
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onConfirmationClick={handleConfirmationClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Footer />
  
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
  
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
  
            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            />
  
            <PopupWithConfirmation
              name={"confirmation"}
              title={"¿Estás seguro/a?"}
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
            />
  
            {selectedCard && (
              <ImagePopup image={selectedCard} onClose={closeAllPopups} />
            )}
          </>
          }
          />
        
        </Route>

        </Routes>
      </CurrentUserContext.Provider>
      </CurrentUserEmailContext.Provider>
    </div>
  );
}

export default App;