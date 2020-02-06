// Constantes para el trabajo con el modelo de anuncio
export const ADVERT_CONSTANTS = {
    TYPE: {
        ALL: 'all',
        BUY: 'buy',
        SELL: 'sell'
    }, 
    TAG: {
        ALL: 'all',
        WORK: 'work', 
        LIFESTYLE: 'lifestyle', 
        MOTOR: 'motor', 
        MOBILE: 'mobile'
    }
}

// Empty advert aux
const EMPTY_ADVERT = {
    _id: '',
    slug: '',
    name: '',
    description: '',
    price: 0,
    type: ADVERT_CONSTANTS.TYPE.BUY,
    tags: [],
    photo: '',
    thumbnail: '',
    booked: false,
    sold: false,
    favorite: false,
    createdAt: undefined,
    updatedAt: undefined
}

/**
 * Modelo de anuncio en nodepop
 */
export default class Advert {
    
    /**
     * Constructor
     * @param {Object} Advert 
     */    
    constructor(ad, apiUrl) {
        this._id = ad._id;
        this.slug = ad.slug;
        this.createdAt = ad.createdAt;
        this.updatedAt = ad.updatedAt;
        this.name = ad.name;
        this.description = ad.description;
        this.price = ad.price;
        this.type = ad.type;
        this.photo = ad.photo.startsWith('/images/')?`${apiUrl.replace('apiv1','')}${ad.photo}`:ad.photo;
        if (ad.thumbnail) {
            this.thumbnail = ad.thumbnail.startsWith('/images/')?`${apiUrl.replace('apiv1','')}${ad.thumbnail}`:ad.thumbnail;
        }
        this.tags = ad.tags;
        this.booked = ad.booked;
        this.sold = ad.sold;
        this.user = ad.user;
        // This property doesn't come from advert model. It is calculated in redux store when loading adverts 
        // based on user session
        this.favorite = undefined 
    }

    /**
     * Comprueba si un objeto advert es válido. (Campos obligatorios completos)
     */
    isValid() {
        return  this.name && 
                this.description && 
                this.price > 0 && 
                this.type && 
                this.photo && 
                this.tags && 
                this.tags.length >= 1;
    }

    static emptyAdvert() {
        return EMPTY_ADVERT;
    }
}