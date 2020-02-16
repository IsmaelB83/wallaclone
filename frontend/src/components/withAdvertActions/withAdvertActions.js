// Node
import React, { Component } from 'react';

const withAdvertActions = (WrappedComponent) => {

    // Composed component
    return class AdvertWithActions extends Component {

        // Acciones posibles sobre el anuncio
        setFavoriteAdvert = () => this.props.onFavoriteAdvert(this.props.advert.slug);
        setSellAdvert = () => this.props.onSellAdvert(this.props.advert.slug);
        setBookAdvert = () => this.props.onBookAdvert(this.props.advert.slug);
        setDeleteAdvert = () => this.props.onDeleteAdvert(this.props.advert.slug);

        render() { 
            return <WrappedComponent 
                        {...this.props} 
                        setFavoriteAdvert={this.setFavoriteAdvert}
                        setSellAdvert={this.setSellAdvert}
                        setBookAdvert={this.setBookAdvert}
                        setDeleteAdvert={this.setDeleteAdvert}
            /> 
        }
    }
}

export default withAdvertActions;