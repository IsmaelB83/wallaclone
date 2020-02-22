// NPM Modules
import React, {useContext} from 'react';
// Material UI
import { Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
// Models
// Own components
import AdvertChip from '../../adverts/AdvertChip';
// Own modules
import { Context } from '../Form';
// CSS
import './styles.css';


// Componente reutilizable de tipo Input (usando material)
export default function SelectMultipleForm(props) {

    // Uso del contexto que envuelve al HOC del formulario
    const context = useContext(Context);
    // Render
    return (
        <FormControl fullWidth className='AdvertEdit__FormControl'>
            { props.label && <InputLabel shrink htmlFor={props.name}>{props.label}</InputLabel> }
            <Select
                multiple
                name={props.name}
                value={context.inputs[props.name] || props.initial}
                onChange={context.handleChangeMultiple}
                renderValue={()=><div className='SelectMultipleForm'>{context.inputs[props.name].map(value=><AdvertChip key={value} type='tag' value={value}/>)}</div>}
                >
                {   props.options.map((value, key) => <MenuItem key={key} value={value}><AdvertChip type={props.chip} value={value}/></MenuItem>) }
            </Select>
        </FormControl>
    )
}