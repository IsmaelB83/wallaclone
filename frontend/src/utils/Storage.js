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
        if (session.name) {
            localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_ID, JSON.stringify(session));
        }
    },

    /**
     * Recuperar sesión del local storage
     */
    readLocalStorage: () => {
        try {
            const session = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_ID);
            return JSON.parse(session)               
        } catch (error) {
            localStorage.clear();
            return undefined;
        }
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