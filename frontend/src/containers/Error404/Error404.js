// NPM Modules
import React from 'react';
// Material UI
// Own modules
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
// Assets
import image404 from '../../assets/images/404.png';
// CSS
import './styles.css';

/**
 * Functional component to render 404 error
 */
export default function Error404() {

  return (
    <React.Fragment>
      <NavBar/>
      <section className="Error404">
        <img src={image404} alt="404 not found..." />
        <h1>Oooppps! The page you are looking for was not found!</h1>
      </section>
      <Footer/>
    </React.Fragment>
  );
  
}