// Models
import { ADVERT_CONSTANTS } from '../../models/Advert';

/**
* Devuelve los anuncios correspondientes a los filtros indicados
* @param {Array} adverts Array de anuncios del store 
* @param {Object} filters Filtros a aplicar a los anuncios del store
*/
export function getVisibleAdverts(adverts, filters) {
    let visibleAdverts = adverts;
    if (filters.name && filters.name !== '') {
        filters.name = filters.name.toLowerCase();
        visibleAdverts = visibleAdverts.filter(advert => advert.name.toLowerCase().includes(filters.name));
    }
    if (filters.tag && filters.tag !== ADVERT_CONSTANTS.TAG.ALL) {
        visibleAdverts = visibleAdverts.filter(advert => advert.tags.indexOf(filters.tag) > -1);
    }
    if (filters.type && filters.type !== ADVERT_CONSTANTS.TYPE.ALL) {
        visibleAdverts = visibleAdverts.filter(advert => advert.type === filters.type);
    }
    if (filters.minPrice && filters.minPrice > 0) {
        visibleAdverts = visibleAdverts.filter(advert => advert.price >= filters.minPrice);
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
        visibleAdverts = visibleAdverts.filter(advert => advert.price <= filters.maxPrice);
    }
    return visibleAdverts;
}

/**
* Devuelve los anuncios del usuario logueado actualmente
* @param {Array} adverts Array de anuncios del store
* @param {Object} session Session del usuario actual 
*/
export function getOwnAdverts(adverts, session) {
    return adverts.filter(advert => advert.user._id === session._id);
}

/**
* Devuelve los anuncios del type indicado
* @param {Array} adverts Array de anuncios del store
* @param {String} type Advert type (buy/sell)
*/
export function getAdvertsByType(adverts, type) {
    return adverts.filter(advert => advert.type === type);
}