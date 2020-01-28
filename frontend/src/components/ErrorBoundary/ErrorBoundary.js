// NPM Modules
import React, { Component } from 'react';
// Material UI
import Container from '@material-ui/core/Container';
// Own modules
// Assets
// CSS

/**
 * Error Boundary (mantengo el class component de react)
 */
export default class ErrorBoundary extends Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    /**
     * Component did catch (necesario para el error boundary)
     */
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
    }

    /**
     * Render
     */
    render() {
        if (this.state.error) {
            return (
            <React.Fragment>
                <Container>
                    <main className='Home'>
                        <h1>Se ha producido un error incontrolado en la aplicación.</h1>
                        <h2>Contacte con el administrador de la app.</h2>
                        <h3>{this.state.error}</h3>
                    </main>
                </Container>
            </React.Fragment>
            );
        } else {
            return this.props.children;
        }
    }
}