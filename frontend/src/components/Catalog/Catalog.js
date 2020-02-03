// NPM Modules
import React, { Component } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Components
import AdvertListSmall from '../AdvertListSmall';
import Loading from '../Loading';
import Footer from '../Footer/';
import NavBar from '../NavBar';
import Error from '../Error';
// Own modules
// Assets
// CSS
import './styles.css';

/**
 * Main App
 */
export default class Catalog extends Component {

  /**
   * Render
   */
  render() {   
    // Variables para el UI
    const { isFetching, error } = this.props.ui;
    // Render
    return (
      <React.Fragment>
        <NavBar/>
        <Container className='Container__Fill'>
          <main className='Main__Section'>
            <div className='Catalog__Results'>
              <p className='Catalog__Count'>{this.props.advertsSelling.length} anuncios en venta.</p>
              { this.props.advertsSelling && this.props.advertsSelling.length > 0 &&
                <AdvertListSmall adverts={this.props.advertsSelling} history={this.props.history}/>
              }
              <p className='Catalog__Count'>{this.props.advertsBuying.length} anuncios en búsqueda.</p>
              { this.props.advertsBuying && this.props.advertsBuying.length > 0 &&
                <AdvertListSmall adverts={this.props.advertsBuying} history={this.props.history}/>
              }
            </div>
            { isFetching && <Loading text={'fetching data'}/> }
            { error &&  <Error error={error}/> }
          </main>
        </Container>
        <Footer/>
      </React.Fragment>
    );
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    this.props.loadAdverts();
  }
}