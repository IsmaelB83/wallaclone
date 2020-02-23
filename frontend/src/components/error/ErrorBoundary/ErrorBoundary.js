// NPM Modules
import React, { Component } from 'react';
// Material UI
import { Container } from '@material-ui/core';
// Own modules
// Assets
import imageError from '../../../assets/images/warning.png';
// CSS

// Error Boundary (mantengo el class component de react)
export default class ErrorBoundary extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError = error => {
        return { error };
    };

    // Capture error
    componentDidCatch(error) {
        this.setState({error: error})
    }

    // Render
    render() {
        const { error } = this.state;
        if (this.state.error) {
            return (
                <Container className='Container'>
                    <div className='Error'>
                        <img src={imageError} alt="error" />
                        <h1>{this.props.t('An uncontrolled error has been detected in the application.')}</h1>
                        <h2>{this.props.t('Please, reload page. Or contact the admin.')}</h2>
                        <p>{error.message}</p>
                    </div>
                </Container>
            );
        }
        return this.props.children;
    }
}