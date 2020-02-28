// NPM Modules
import React from 'react';
// Material UI
// Own modules
// Models
// Assets
// CSS
import './styles.css';

import withForm from '../../hocs/withForm';

/**
 * Component reutilizable para formularios. Lo exporto envuelto en el HOC que me aporta
 * las funcionalidades para controlar un cambio en los inputs/checbox y submit
 */
const Form = ({children, ...props}) => <form {...props}>{children}</form>

export default withForm(Form);
