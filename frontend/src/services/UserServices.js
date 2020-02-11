// NPM Modules
import Axios from 'axios';
import Querystring from 'querystring';
// Material UI
// Own modules
// Models
import Advert from '../models/Advert';
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/user`;


/**
* Objeto API
*/
export default {
    
    /**
    * Create a new user
    */
    create: (name, email, password) => {
        // Endpoint
        let baseURL = `${API_URL}`;
        // Call endpoint and return
        return Axios.post(
            baseURL, 
            Querystring.stringify({ name: name, email: email, password: password }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(res => res);
    },
        
    /**
    * Editar los datos de un usuario
    */
    edit: async (user, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}`;
        // Form Data
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('password', user.password);
        // Config 
        const config = {
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        // Call endpoint and return
        Axios.put( baseURL, formData, config )
        .then(res => res.data.user)
    },

    /**
    * Editar los datos de un usuario
    */
   delete: async (id, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/${id}`;
        // Config 
        const config = { headers: { 'Authorization': `Bearer ${jwt}`, } };
        // Call endpoint and return
        Axios.delete( baseURL, config )
        .then(res => res.data)
    },
        
    /**
    * Llama a la API para insertar/eliminar un anuncio a favoritos
    * @param {Advert} slug Slug del anuncio del que quiero añadir/quitar de favorito
    * @param {String} jwt Token para autenticar en el API
    */
    setFavorite: (slug, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}/favorites/${slug}`;
        // Call endpoint and return
        return Axios.put(
            baseURL, 
            { headers: { 'Authorization': `Bearer ${jwt}`} }
        )
        .then(res => {
            return {
                advert: new Advert(res.data.advert),
                favorite: res.data.favorite
            }                
        });
    },
        
    /**
    * Get favorite adverts for the user
    */
    getFavorites: (jwt) => {
        // Endpoint
        let baseURL = `${API_URL}/favorites`;
        // Call endpoint and return
        return Axios.get(
            baseURL, 
            { headers: { 'Authorization': `Bearer ${jwt}`} }
        )
        .then(res => {
            const adverts = res.data.results.map(ad => {
                ad.favorite = true;
                return new Advert(ad);
            });
            return {
                start: 0,
                end: adverts.length - 1,
                totalCount: adverts.length,
                adverts: adverts
            }
        });
    },
}