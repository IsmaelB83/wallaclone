// NPM Modules
import React, {useContext} from 'react';
// Material UI
import { TextField, FormControl } from '@material-ui/core';
// Models
// Own modules
import { Context } from '../Form';
// CSS


// Componente reutilizable de tipo Input (usando material)
export default function TextAreaForm(props) {

    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);

    // Render
    return (
        <FormControl className='InputForm'>
            <TextField
                name={props.name}
                label={props.label}
                value={context.inputs[props.name] || ''}
                onChange={context.handleInputChange}
                required={props.required}
                multiline={props.rows>1}
                rows={props.rows}
                placeholder={props.placeholder}
                helpertext={props.helperText}
            />
        </FormControl>
    )
}