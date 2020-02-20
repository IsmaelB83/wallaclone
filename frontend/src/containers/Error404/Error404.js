// NPM Modules
import React from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Own components
import Error from '../../components/Error';
// Own modules
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
// Assets
// CSS
import './styles.css';

/**
 * Functional component to render 404 error
 */
export default function Error404(props) {
  return (
    <React.Fragment>
        <NavBar session={props.session} onLogout={props.logout}/>
        <Container className='Container'>
            <Error type='404'/>
        </Container>
        <Footer session={props.session} onLogout={props.logout}/>
    </React.Fragment>
  );
}