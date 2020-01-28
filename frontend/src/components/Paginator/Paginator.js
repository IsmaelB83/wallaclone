// NPM Modules
import React from 'react';
// Material UI
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// Own modules
// Assets
import './styles.css'
// CSS

/**
* Functional component for the advert paginator
*/
export default function Paginator(props) {
      
    const handleBack = () => props.handleMovePaginator(props.currentPage > 0 ? -1 : 0)
    const handleNext = () => props.handleMovePaginator(props.currentPage < props.numPages ? 1 : 0)

    return (
        <MobileStepper
            className='Paginator'
            variant="dots"
            steps={props.numPages}
            position="static"
            activeStep={props.currentPage}
            backButton={
                <Button size="small" onClick={handleBack} disabled={props.currentPage === 0} className='ButtonWallakeep ButtonWallakeep__Green'>
                <KeyboardArrowLeft />
                Back
                </Button>
            }
            nextButton={
                <Button size="small" onClick={handleNext} disabled={props.currentPage === props.numPages - 1 } className='ButtonWallakeep ButtonWallakeep__Green'>
                Next
                <KeyboardArrowRight />
                </Button>
            }
        />    
    );
}