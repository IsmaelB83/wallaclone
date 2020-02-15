// Node modules
import React from 'react';
// Material UI
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// Css
import './styles.css';

// Proporciona funcionalidad de paginado a cualquier lista de objetos
const withPaginator = (WrappedComponent) => {

    return function AdvertListWithPaginator(props) {

        // Destructuring props
        const { adverts, start, end, totalCount } = props;
        let { currentPage, isFetching } = props;

        // Local variables
        const itemsPerPage=parseInt(process.env.REACT_APP_MAX_ADVERTS_UI);
        const numPages = Math.ceil(adverts.length/itemsPerPage);
        const minAdvert = currentPage * itemsPerPage;
        const maxAdvert = currentPage * itemsPerPage + itemsPerPage;

        // Next/Previous page
        const handleMovePaginator = increment => {
            currentPage += increment;
            if (currentPage > -1 && currentPage < numPages) {
                props.onSetCurrentPage(currentPage);
            }
        }

        // Previous page button
        const renderButtonBack = () => {
            let callAPI = !currentPage && start > 0
            let disableBack = !currentPage && !callAPI;
            let Icon = !callAPI?KeyboardArrowLeft:RotateLeftIcon;
            return  <Button size='small' onClick={()=>!callAPI?handleMovePaginator(-1):props.onfetchIterateAdverts(-1)} 
                            disabled={disableBack} className='ButtonWc ButtonWc__Green'>
                        <Icon />
                    </Button>
        }

        // Next page button
        const renderButtonNext = () => {
           
            let callAPI = ( numPages <= currentPage + 1 ) && ( end + 1 < totalCount );
            let disableNext = ( numPages <= currentPage + 1 ) && !callAPI;
            let Icon = !callAPI?KeyboardArrowRight:RotateLeftIcon;
            return  <Button size='small' onClick={()=>!callAPI?handleMovePaginator(1):props.onfetchIterateAdverts(1)} 
                            disabled={disableNext} className='ButtonWc ButtonWc__Green'>
                        <Icon />
                    </Button>
        }
       
        return (
            <React.Fragment>
                { adverts.length > 0 &&
                    <React.Fragment>
                        <div className='AdvertList__Paginator'>
                            <MobileStepper
                                className='Paginator'
                                variant='dots'
                                steps={numPages}
                                position='static'
                                activeStep={currentPage}
                                backButton={renderButtonBack()}
                                nextButton={renderButtonNext()}
                            />
                        </div>
                        <div className='SearchPanel__Statistics'> 
                            <p>Resultados {props.start} a {props.end} recuperados en la última llamada de un total de {props.totalCount}</p>
                        </div> 
                    </React.Fragment>
                }
                <WrappedComponent {...props} adverts={adverts.slice(minAdvert, maxAdvert || 1)} isFetching={isFetching}/> 
            </React.Fragment>
        );
        
        
    }
}

export default withPaginator;