// Node
import React, { Component } from 'react';

const withAdvertActions = (WrappedComponent) => {

    // Composed component
    return class AdvertWithActions extends Component {

        // Acciones posibles sobre el anuncio
        favoriteAdvert = () => this.props.onFavoriteAdvert(this.props.advert.slug);
        sellAdvert = () => this.props.onSellAdvert(this.props.advert.slug);
        bookAdvert = () => this.props.onBookAdvert(this.props.advert.slug);
        deleteAdvert = () => this.props.onDeleteAdvert(this.props.advert.slug);
        openChat = () => this.props.onOpenChat(this.props.advert.slug);

        render() { 
            return <WrappedComponent 
                        {...this.props} 
                        onFavoriteAdvert={this.favoriteAdvert}
                        onSellAdvert={this.sellAdvert}
                        onBookAdvert={this.bookAdvert}
                        onDeleteAdvert={this.deleteAdvert}
                        onOpenChat={this.openChat}
            /> 
        }
    }
}

export default withAdvertActions;