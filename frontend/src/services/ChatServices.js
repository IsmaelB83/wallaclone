// NPM Modules
import Axios from 'axios';
// Material UI
// Own modules
import Chat from '../models/Chat';
// Assets
// CSS

// Endpoint
const API_URL = `${process.env.REACT_APP_API_URL}/chats`;

/**
* Objeto API
*/
export default {
    
    /**
    * Obtener todos los chats
    */
    getChats: jwt => {
        // Endpoint
        let baseURL = `${API_URL}`;
        // Config 
        const config = { 
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/x-www-form-urlencoded' 
            } 
        }
        // Call endpoint and return
        return Axios.get(baseURL, config)
        .then(res => res.data.results.map(chat => new Chat(chat)));
    },
    
    /**
    * Obtener toda la conversación de un chat
    */
    getChat: (id, jwt) => {
        // Endpoint
        let baseURL = `${API_URL}/${id}`;
        // Config 
        const config = { 
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/x-www-form-urlencoded' 
            } 
        }
        // Call endpoint and return
        return Axios.get(baseURL, config)
        .then(res => new Chat(res.data.result));
    },
    
    /**
    * Crear un nuevo chat
    * @param {Advert} chat Chat information
    * @param {Advert} jwt JWT for authentication
    */
    postChat: (chat, jwt) => {
        // Endpoint
        const baseURL = `${API_URL}`;
        // Form Data
        const formData = new FormData();
        formData.append('advert', chat.advert);
        formData.append('users', chat.users);
        // Config 
        const config = { 
            headers: { 
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/x-www-form-urlencoded' 
            } 
        }
        // Call endpoint and return
        return Axios.post(baseURL, formData, config)
        .then(res => new Chat(res.data.result));
    },
}