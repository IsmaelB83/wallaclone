// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
// Material UI
// Components
import App from './containers/App';
// Own modules
import { configureStore } from './store';
// Assets
// CSS
import './index.css';

// Store de redux
const store = configureStore();

// Render
ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider maxSnack={2}>
            <App /> 
        </SnackbarProvider>
    </Provider>, document.getElementById('root')
);