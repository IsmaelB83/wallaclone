// Models
import User from './User';

// Constantes para el trabajo con el modelo de anuncio
export const ADVERT_CONSTANTS = {
    STATUS: {
        SOLD: 'sold',
        BOOKED: 'booked'
    },
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
export const EMPTY_ADVERT = {
    _id: '',
    slug: '',
    name: '',
    description: '',
    price: 0,
    type: ADVERT_CONSTANTS.TYPE.BUY,
    photo: '',
    thumbnail: '',
    booked: false,
    sold: false,
    favorite: false,
    createdAt: undefined,
    updatedAt: undefined
}

// Endpoint
const API_URL = process.env.REACT_APP_API_URL.replace('/apiv1','');

/**
 * Modelo de anuncio en wallaclone
 */
export default class Advert {
    
    /**
     * Constructor
     * @param {Object} Advert 
     */    
    constructor(ad) {
        this._id = ad._id;
        this.slug = ad.slug;
        this.createdAt = ad.createdAt;
        this.updatedAt = ad.updatedAt;
        this.name = ad.name;
        this.description = ad.description;
        this.price = ad.price;
        this.type = ad.type;
        this.photo = ad.photo.startsWith('/images/')?`${API_URL}${ad.photo}`:ad.photo;
        if (ad.thumbnail) {
            this.thumbnail = ad.thumbnail.startsWith('/images/')?`${API_URL}${ad.thumbnail}`:ad.thumbnail;
        }
        this.tags = ad.tags;
        this.booked = ad.booked;
        this.sold = ad.sold;
        if (ad.user) {
            this.user = new User(ad.user);
        }        
        this.file = ad.file;
        this.favorite = ad.favorite;
    }

    /**
     * Comprueba si un objeto advert es válido. (Campos obligatorios completos)
     */
    isValid() {
        return  this.name && 
                this.description && 
                this.price > 0 && 
                this.type && 
                this.tags && 
                this.tags.length >= 1;
    }
}