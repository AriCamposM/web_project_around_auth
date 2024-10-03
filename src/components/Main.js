import React from "react";
import editProfileIcon from "../images/edit__profile-icon.png";
import editButton from "../images/Edit_Button.png";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onConfirmationClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  
  const CurrentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__photo">
            <img
              className="profile__image"
              src={CurrentUser.avatar}
              alt="Profile Pic"
            />
            <img
              className="profile__edit-icon"
              src={editProfileIcon}
              alt="Edit Icon"
              onClick={onEditAvatarClick}
            />
          </div>
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{CurrentUser.name}</h1>
              <button className="profile__button-edit" onClick={onEditProfileClick}>
                <img
                  src={editButton}
                  alt="Edit Button"
                  className="profile__button-image"
                  onClick={onEditProfileClick}
                />
              </button>
            </div>
            <h2 className="profile__about">{CurrentUser.about}</h2>
          </div>

          <div className="profile__add">
            <button className="profile__button-add" onClick={onAddPlaceClick}>
              +
            </button>
          </div>
        </div>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            onCardLike={onCardLike}
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
          ></Card>
        ))}
      </section>
    </>
  );
}

export default Main;
