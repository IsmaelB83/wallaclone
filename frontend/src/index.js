// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
// Material UI
// Components
import ErrorBoundary from './components/ErrorBoundary';
import App from './containers/App';
// Own modules
import './utils/i18n';
import 'moment/locale/es';
import 'moment/locale/en-gb';
// Assets
// CSS
import './index.css';

// Render
ReactDOM.render(
        <ErrorBoundary>
            <SnackbarProvider maxSnack={1}>
                <App/>
            </SnackbarProvider>
        </ErrorBoundary>
    , document.getElementById('root'));