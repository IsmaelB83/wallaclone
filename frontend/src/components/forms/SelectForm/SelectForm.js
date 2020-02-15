// NPM Modules
import React, {useContext} from 'react';
// Material UI
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
// Models
// Own components
import AdvertChip from '../../AdvertChip';
// Own modules
import { Context } from '../Form';
// CSS


// Componente reutilizable de tipo Input (usando material)
export default function SelectForm(props) {

    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);

    // Render
    return (
        <FormControl className='InputForm'>
            { props.label && <InputLabel shrink htmlFor={props.name}>{props.label}</InputLabel> }
            <Select
                name={props.name}
                value={context.inputs[props.name] || props.initial}
                multiple={props.multiple}
                onChange={props.multiple?context.handleChangeMultiple:context.handleInputChange}
                className='SearchPanel__Type'
                displayEmpty
            >
                { props.options.map(option => <MenuItem key={option} value={option}><AdvertChip type='type' value={option}/></MenuItem>) }
            </Select>
        </FormControl>
    )
}