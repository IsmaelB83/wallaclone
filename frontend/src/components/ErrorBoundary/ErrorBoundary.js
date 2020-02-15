// NPM Modules
import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
// Material UI
import Container from '@material-ui/core/Container';
// Own modules
// Assets
// CSS

/**
 * Error Boundary (mantengo el class component de react)
 */
class ErrorBoundary extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    // Component did catch (necesario para el error boundary)
    componentDidCatch(error, errorInfo) {
        this.setState({ error });
    }

    // Render
    render() {
        if (this.state.error) {
            return (
            <React.Fragment>
                <Container className='Container__Fill'>
                    <main className='Home'>
                        <h1>{this.props.t('An uncontrolled error has been detected in the application.')}</h1>
                        <h2>{this.props.t('Contact the admin.')}</h2>
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

export default withNamespaces()(ErrorBoundary);