import React from "react";
import likeButtonIcon from "../images/elements__heart.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import TrashIcon from "../images/element__trash.png";
import likeButtonActive from "../images/heart__black.png";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const CurrentUser = React.useContext(CurrentUserContext);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = card.owner._id === CurrentUser._id;

  // Creando una variable que después establecerás en `className` para el botón eliminar
  const cardDeleteButtonClassName = `element__trash ${
    isOwn ? "element__trash-visible" : "element__trash-hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === CurrentUser._id);

  const cardLikeButtonClassName = `element__heart ${
    isLiked ? "element__button.active" : ""
  }`;

  return (
    <div className="element">
      <img
        src={TrashIcon}
        alt="Delete Button Of The Card"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="element__image-container">
        <img
          src={card.link}
          alt={card.name}
          className="element__image"
          onClick={handleClick}
        />
      </div>
      <div className="element__footer">
        <p className="element__text">{card.name}</p>
        <button className="element__button">
          <img
            src={isLiked ? likeButtonActive : likeButtonIcon}
            alt="Like Button"
            className="element__heart"
            onClick={handleLikeClick}
          />
          <span className="element__likes-count">{card.likes.length}</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
