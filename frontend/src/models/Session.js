// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

/**
 * Modelo sesión de usuario
 */
export default class Session {
    
    /**
     * Constructor
     * @param {Object} Session 
     */    
    constructor(user) {
        this._id = user._id;
        this.login = user.login;
        this.name = user.name;
        this.email = user.email;
        this.jwt = user.token;
        this.avatar = 'https://material-ui.com/static/images/avatar/1.jpg';
        this.favorites = user.favorites;
    }
}