// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
// Material UI
// Components
import App from './components/App';
// Own modules
import { configureStore } from './store';
import LocalStorage from './utils/Storage';
import { setSession } from './store/actions';
// Assets
// CSS
import './index.css';

// Store de redux
const store = configureStore();

// Intento recuperar la sesión del storage, y si existe evito el login
let session = LocalStorage.readLocalStorage();
if (session) {
    store.dispatch(setSession(session));
}

// Render
ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={2}>
            <App /> 
        </SnackbarProvider>
    </Provider>, document.getElementById('root')
);