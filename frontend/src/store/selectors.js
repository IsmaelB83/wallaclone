// Models
import { ADVERT_CONSTANTS } from '../models/Advert';

export function getVisibleAdverts(adverts, filters) {
    let visibleAdverts = adverts;
    if (filters.name && filters.name !== '') {
        filters.name = filters.name.toLowerCase();
        visibleAdverts = visibleAdverts.filter(advert => advert.name.toLowerCase().includes(filters.name));
    }
    if (filters.tag && filters.tag !== ADVERT_CONSTANTS.TAG.ALL)
        visibleAdverts = visibleAdverts.filter(advert => advert.tags.indexOf(filters.tag) > -1);
    if (filters.type && filters.type !== ADVERT_CONSTANTS.TYPE.ALL)
        visibleAdverts = visibleAdverts.filter(advert => advert.type === filters.type);
    if (filters.minPrice && filters.minPrice > 0)
        visibleAdverts = visibleAdverts.filter(advert => advert.price >= filters.minPrice);
    if (filters.maxPrice && filters.maxPrice > 0)
        visibleAdverts = visibleAdverts.filter(advert => advert.price <= filters.maxPrice);
    return visibleAdverts;
}