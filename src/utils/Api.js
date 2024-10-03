class Api {
    constructor({baseUrl, headers}){
      this._baseUrl = baseUrl;
      this._headers = headers;
  
    }
  
    //Recomendaciones generales, metodo para comprobar la respuesta del servidor
    _handleResponse(res){
      if(res.ok){
        return res.json();
      }
  
      return Promise.reject(`Error:${res.status}`);
  
    }
  
    //1-Cargar la información del usuario desde el servidor
    getUserInfo(){
      return fetch(`${this._baseUrl}/users/me`,{
        headers: this._headers,
      })
      .then(this._handleResponse)
    }
  
  
  
    // 2-Cargas tarjetas desde el servidor
    getInitialCards(){
      return fetch(`${this._baseUrl}/cards`,{
        headers: this._headers,
      })
      .then(this._handleResponse)
    }
  
    //3- Editar Perfil
    updateUserInfo({name,about}){
      return fetch(`${this._baseUrl}/users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(this._handleResponse)
    }
  
    // 4- Añadir una nueva tarjeta
    addNewCard({name,link}){
      return fetch(`${this._baseUrl}/cards`,{
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._handleResponse)
    }
  
   // Eliminar Tarjetas
  
    deleteCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}`,{
        method:'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponse);
    }
  
    // 9- Para subir la foto al servidor
    updateAvatar(avatar){
      return fetch(`${this._baseUrl}/users/me/avatar`,{
        method:'PATCH',
        headers:this._headers,
        body: JSON.stringify({
          avatar: avatar,
        })
      })
      .then(this._handleResponse)
    }
  
    // agregar el like :3
    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
    // quitar el like
    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._handleResponse);
    }
  
  }
  
  const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web_es_10",
    headers: {
      authorization: "92699bb5-75ce-4d70-95e1-51dbc7b5449b",
      "Content-Type": "application/json",
    },
  }); 

  export default api;