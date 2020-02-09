// Node modules
import React, { Component } from 'react';
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

    return class AdvertListWithPaginator extends Component {

        // Constructor
        constructor(props) {
            super(props);
            this.state = {
                currentPage: 0,
                numPages: Math.ceil(props.adverts.length/props.itemsPerPage),
                minAdvert: 0,                         
                maxAdvert: this.props.itemsPerPage,
                callNextAPI: false,
                callPrevAPI: false,
            };
        }

        handleNext = () => this.handleMovePaginator(1);
        handleBack = () => this.handleMovePaginator(-1);
        handleMovePaginator = increment => {
            let currentPage = this.state.currentPage;
            currentPage += increment;
            if (currentPage > -1 && currentPage < this.state.numPages) {
                this.setState({
                    minAdvert: currentPage * this.props.itemsPerPage,
                    maxAdvert: currentPage * this.props.itemsPerPage + this.props.itemsPerPage,
                    currentPage: currentPage
                }, () => {
                    this.props.onSetCurrentPage(currentPage);
                });
            }
        }

        // Render
        render() {
            return (
                <React.Fragment>
                    <div className='AdvertList__Paginator'>
                        <MobileStepper
                            className='Paginator'
                            variant='text'
                            steps={this.state.numPages}
                            position='static'
                            activeStep={this.state.currentPage}
                            backButton={this.renderButtonBack()}
                            nextButton={this.renderButtonNext()}
                        />
                    </div>
                    <WrappedComponent {...this.props} adverts={this.props.adverts.slice(this.state.minAdvert, this.state.maxAdvert)}/> 
                </React.Fragment>
            );
        }

        renderButtonBack = () => {
            let callAPI = !this.state.currentPage && this.props.start > 0
            let disableBack = !this.state.currentPage && !callAPI;
            let click = !callAPI?this.handleBack:this.props.onFetchMoreAdverts;
            let Icon = !callAPI?KeyboardArrowLeft:RotateLeftIcon;
            let text = !callAPI?'Back':'Load Previous Ads';
            return  <Button size='small' onClick={()=>click()} disabled={disableBack} className={`ButtonWallakeep ButtonWallakeep__${!callAPI?'Green':'Blue'}`}><Icon />{text} </Button>
        }

        renderButtonNext = () => {
            let callAPI = ( this.state.numPages <= this.state.currentPage + 1 ) && ( this.props.end < this.props.totalCount );
            let disableNext = ( this.state.numPages <= this.state.currentPage + 1 ) && !callAPI;
            let click = !callAPI?this.handleNext:this.props.onFetchMoreAdverts;
            let Icon = !callAPI?KeyboardArrowRight:RotateLeftIcon;
            let text = !callAPI?'Next':'Load Next Ads';
            return  <Button size='small' onClick={()=>click()} disabled={disableNext} className={`ButtonWallakeep ButtonWallakeep__${!callAPI?'Green':'Blue'}`}><Icon />{text} </Button>
        }
    }
}



export default withPaginator;