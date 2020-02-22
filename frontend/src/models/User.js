// Assets
import imgUser from '../assets/images/user.png';
// CSS

// Endpoint
const API_URL = process.env.REACT_APP_API_URL.replace('/apiv1','');

// Empty user
export const EMPTY_USER = {
    avatar: imgUser,
    name: '',
    login: '',
    online: false
}

// Modelo sesión de session
export default class User {
    
    /** Constructor
     * @param {Object} User 
     */    
    constructor(user) {
        this._id = user._id;
        this.login = user.login;
        this.name = user.name;
        this.email = user.email;
        if (!user.avatar) {
            user.avatar = '/images/avatars/avatar.png';
        }
        this.avatar = user.avatar.startsWith('/images/')?`${API_URL}${user.avatar}`:imgUser;
    }
}