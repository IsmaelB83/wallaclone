// NPM Modules
import React, {useContext} from 'react';
// Material UI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Models
// Own modules
import { Context } from '../Form';
// CSS


// Componente reutilizable de tipo checkbox (usando material)
export default function CheckForm(props) {
  
    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);

    // Render
    return (
        <FormControlLabel
            name={props.name}
            label={props.label}
            control={
            <Checkbox
                color={props.color}
                checked={context.inputs[props.name] || false }
                onChange={context.handleCheckChange}
            />
            }
        />
    )
}
