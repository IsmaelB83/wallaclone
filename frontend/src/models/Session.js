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
    constructor(user, maxAdverts = 8) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.jwt = user.token;
        this.maxAdverts = maxAdverts;
        if (this.maxAdverts <= 0 || this.maxAdverts === '') {
            this.maxAdverts = 8;
        }
    }
}