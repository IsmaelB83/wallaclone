// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
// Material UI
// Components
import App from './containers/App';
// Own modules
import './utils/i18n';
import 'moment/locale/es';
import 'moment/locale/en-gb';
// Assets
// CSS
import './index.css';

// Render
ReactDOM.render(<App />, document.getElementById('root'));