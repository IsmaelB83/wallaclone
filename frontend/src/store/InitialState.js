// Models
import { ADVERT_CONSTANTS } from '../models/Advert';

// APP Initia State
export const initialState = {
    // User session
    session: {},
    // Adverts in the app
    adverts: [],
    // Available tags in the backend
    tags: [],
    // User favorites
    favorites: [],
    // Filters applied (text, tag, type, amounts)
    filters: {
        name: '',
        type: ADVERT_CONSTANTS.TYPE.ALL,
        tag: ADVERT_CONSTANTS.TAG.ALL,
        minPrice: 0,
        maxPrice: 0
    },
    // UI State
    ui: {
        error: null,
        isAuthenticating: false,
        isFetching: false,
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        currentPage: 0,
    }
}