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
}