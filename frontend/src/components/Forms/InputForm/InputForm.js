// NPM Modules
import React, {useContext} from 'react';
// Material UI
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
// Models
// Own modules
import { Context } from '../Form';
// CSS


/**
 * Componente reutilizable de tipo Input (usando material)
 */
export default function InputForm(props) {
  
    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);

    // Render
    return (
        <FormControl>
            <Input
            name={props.name}
            value={context.inputs[props.name] || ''}
            onChange={context.handleInputChange}
            type={props.type}
            placeholder={props.placeholder}
            startAdornment={
                <InputAdornment position='start' className='InputIcon__Icon'>
                    {props.icon}
                </InputAdornment>
            }
            endAdornment={props.endAdornment}
            required={props.required}
            />
        </FormControl>
    )
}
