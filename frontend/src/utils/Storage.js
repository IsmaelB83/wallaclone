// NPM Modules
// Material UI
// Own modules
// Assets
// CSS

/**
 * Objeto para trabajar con local storage
 */
const LocalStorage = {

    /**
     * Salvar sesión en local storage
     */
    saveLocalStorage: (session) => {
        localStorage.setItem('wallafit', JSON.stringify(session));
    },

    /**
     * Recuperar sesión del local storage
     */
    readLocalStorage: () => {
        const session = localStorage.getItem('wallafit');
        return JSON.parse(session)
    },
    
    /**
     * Clean local storage
     */
    cleanLocalStorage: () => {
        localStorage.clear();
    }
}

/**
 * Retorno el objeto
 */
export default LocalStorage;