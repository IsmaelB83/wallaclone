// NPM Modules
import React, { useState, useRef } from 'react';
// Material UI
import Button from '@material-ui/core/Button';
import EuroIcon from '@material-ui/icons/Euro';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
// Own Components
import Form from '../Form';
import InputForm from '../InputForm';
import SelectForm from '../SelectForm';
// Own modules
import { initialState } from '../../../store/InitialState';
// Models
import { ADVERT_CONSTANTS as C } from '../../../models/Advert';
// Assets
// CSS
import './styles.css';

// Panel de búsquedas
export default function SearchForm(props) {

    // Translate
    const { t } = props;

    // Ref to form (to reset fields)
    const searchFormRef = useRef(null);

    // Hide/Collapse search menu
    const [collapsed, setCollapsed] = useState(true);
    const handleCollapse = (ev) => {
        ev.preventDefault();
        setCollapsed(!collapsed);
    }

    // Reseteo el estado a los valores originales de búsqueda
    const submitHandler = inputs => props.onSearchAdverts(inputs);

    // Search in real time in store (dont want to loose this functinality in the HOC version of the form)
    const changedInputsHandler = inputs => {
        props.onSetFilters(inputs);
    }

    // Reseteo el estado a los valores originales de búsqueda
    const resetHandler = () => {
        searchFormRef.current.resetInputs(initialState.filters);
        props.onSearchAdverts();
    }
   
    // Render del componente
    return (
        <div className={`SearchPanel SearchPanel--${!collapsed?'Show':'Hide'}`}>
            <div className='SearchPanel__Title' onClick={handleCollapse}>
                <h2>{t('Search Adverts')}</h2>
                <button onClick={handleCollapse} className='SearchCollapseButton'>
                    {collapsed?<ExpandMoreIcon/>:<ExpandLessIcon/>}
                </button>
            </div>
            <Form ref={searchFormRef} className='SearchPanel__Form' onSubmit={submitHandler} extra={{notifyChanges: changedInputsHandler}} initial={props.filters}>
                <div className='InputSearch'>                    
                    <InputForm name='name' type='text' placeholder={t('Search adverts by name')} maxLength={"30"} className='Input' startIcon={<SearchIcon/>}/>
                </div>
                <div className='SearchPanel__Filters'>
                    <div className='SearchPanel__FiltersGrid'>
                        <SelectForm name='type' label={t('Type')} options={[C.TYPE.ALL, C.TYPE.BUY, C.TYPE.SELL]}chip='type'/>
                        <SelectForm name='tag' label={t('Tags')} options={[C.TAG.ALL, ...props.tags]} chip='tag'/>
                        <InputForm name='minPrice' type='number' label={t('Price from')} maxLength={10} endIcon={<EuroIcon/>}/>
                        <InputForm name='maxPrice' type='number' label={t('Price to')} maxLength={10} endIcon={<EuroIcon/>}/>
                    </div>
                </div>
                <div className='SearchPanel__Footer'>
                    <Button type='submit' variant='contained' color='primary' startIcon={<SearchIcon />}>{t('Search')}</Button>
                    <Button variant='contained' color='secondary' onClick={resetHandler} startIcon={<ClearIcon/>}> {t('Reset')} </Button>
                </div>
            </Form>
        </div>
    );
}