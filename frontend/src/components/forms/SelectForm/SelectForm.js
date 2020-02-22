// NPM Modules
import React, { useContext } from 'react';
// Material UI
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
// Models
// Own components
import AdvertChip from '../../adverts/AdvertChip';
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
                value={context.inputs[props.name]}
                onChange={context.handleInputChange}
                className='SearchPanel__Type'
            >
                { props.options.map(option => <MenuItem key={option} value={option}><AdvertChip type='type' value={option}/></MenuItem>) }
            </Select>
        </FormControl>
    )
}