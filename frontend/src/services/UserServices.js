// NPM Modules
import Axios from 'axios';
import Querystring from 'querystring';
// Material UI
// Own modules
// Assets
// CSS

// Endpoint
const API_URL = 'https://127.0.0.1:8443/apiv1';

/**
* Objeto API
*/
export default {
  
  /**
  * Create a new user
  */
  create: (name, email, password) => {
    // Endpoint
    let baseURL = `${API_URL}/user/`;
    // Call endpoint and return
    return Axios.post(
      baseURL, 
      Querystring.stringify({ name: name, email: email, password: password }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    )
    .then(res => res);
  },
  
  /**
   * Llama a la API para insertar/eliminar un anuncio a favoritos
   * @param {Advert} slug Slug del anuncio del que quiero añadir/quitar de favorito
   * @param {String} jwt Token para autenticar en el API
   */
  setFavorite: (slug, jwt) => {
    // Endpoint
    const baseURL = `${API_URL}/user/favorites/${slug}`;
    // Call endpoint and return
    return Axios.put(
      baseURL, 
      { headers: { 'Authorization': `Bearer ${jwt}`} }
    )
    .then(res => {
      return {
        _id: res.data._id,
        favorite: res.data.favorite
      }}
    );
  },

}