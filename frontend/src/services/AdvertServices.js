// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
import Advert from '../models/Advert';
// Assets
// CSS

// Endpoint
const API_URL = 'https://127.0.0.1:8443/apiv1';

/**
* Objeto API
*/
export default {
  
  /**
  * Obtener todos los tags
  */
  getTags: () => {
    // Endpoint
    let baseURL = `${API_URL}/adverts/tags`;
    // Call endpoint and return
    return Axios.get(baseURL)
    .then(res => res.data.results);
  },
  
  /**
  * Obtener todos los anuncios
  */
  getAdverts: () => {
    // Endpoint
    let baseURL = `${API_URL}/adverts`;
    // Call endpoint and return
    return Axios.get(baseURL)
    .then(res => res.data.results.map(advert => new Advert(advert, API_URL)));
  },
  
  /**
  * Obtener un anuncio por su slug
  */
  getAdvert: (slug) => {
    // Endpoint
    let baseURL = `${API_URL}/adverts/${slug}`;
    // Call endpoint and return
    return Axios.get(baseURL)
    .then(res => new Advert(res.data.result, API_URL));
  },
  
  /**
  * Buscar por query generica
  */
  searchAdverts: (filters) => {
    // Endpoint
    let baseURL = `${API_URL}/adverts?`;
    if (filters.name) baseURL =`${baseURL}name=${filters.name}&`;
    if (filters.type && filters.type !== 'all') baseURL =`${baseURL}venta=${filters.type==='sell'?true:false}&`;
    if (filters.tag && filters.tag !== 'all') baseURL =`${baseURL}tag=${filters.tag}&`;
    const priceFrom = parseInt(filters.priceFrom);
    const priceTo = parseInt(filters.priceTo);
    if (priceFrom && !priceTo) {
      baseURL =`${baseURL}price=${priceFrom}-`;
    } else if (!priceFrom && priceTo) {
      baseURL =`${baseURL}price=-${priceTo}&`;
    } else if (priceFrom && priceTo) {
      baseURL =`${baseURL}price=${priceFrom}-${priceTo}&`;
    }
    // Call endpoint and return
    return Axios.get(baseURL)
    .then(res => res.data.results.map(advert => new Advert(advert, API_URL)));
  },
  
  /**
  * Llama a la API para crear un nuevo anuncio
  * @param {Advert} advert 
  */
  postAdvert: (advert, jwt) => {
    // Endpoint
    const baseURL = `${API_URL}/adverts`;
    // Form Data
    const formData = new FormData();
    formData.append('name', advert.name);
    formData.append('description', advert.description);
    formData.append('price', advert.price);
    formData.append('type', advert.type);
    formData.append('tags', advert.tags);
    formData.append('photo', advert.file);
    // Config 
    const config = {
      headers: { 
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    // Call endpoint and return
    return Axios.post( baseURL, formData, config )
    .then(res => new Advert(res.data.result, API_URL));
  },
  
  /**
  * Llama a la API para editar un anuncio
  * @param {Advert} advert 
  */
  editAdvert: (advert, jwt) => {
    // Endpoint
    const baseURL = `${API_URL}/adverts/${advert.slug}`;
    // Form Data
    const formData = new FormData();
    formData.append('name', advert.name);
    formData.append('description', advert.description);
    formData.append('price', advert.price);
    formData.append('type', advert.type);
    formData.append('tags', advert.tags);
    formData.append('booked', advert.booked);
    formData.append('sold', advert.sold);
    formData.append('photo', advert.file || advert.photo);
    // Config 
    const config = {
      headers: { 
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'multipart/form-data'
      }
    }
    // Call endpoint and return
    return Axios.put( baseURL, formData, config )
    .then(res => new Advert(res.data.result, API_URL));
  },

  /**
   * Llama a la API para insertar un like del anuncio
   * @param {Advert} slug Slug del anuncio del que quiero hacer like
   * @param {String} jwt Token para autenticar en el API
   */
  likeAdvert: (slug, jwt) => {
    // Endpoint
    const baseURL = `${API_URL}/adverts/like/${slug}`;
    // Call endpoint and return
    return Axios.put(
      baseURL, 
      { headers: { 'Authorization': `Bearer ${jwt}`} }
    )
    .then(res => res.data.result);
  },

  /**
  * Llama a la API para editar un anuncio
  * @param {Advert} advert 
  */
  deleteAdvert: (slug, jwt) => {
    // Endpoint
    const baseURL = `${API_URL}/adverts/${slug}`;
    // Call endpoint and return
    return Axios.delete(
      baseURL, 
      { headers: { 'Authorization': `Bearer ${jwt}`} }
    )
    .then(res => new Advert(res.data.result, API_URL));
  }
}