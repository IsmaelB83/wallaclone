// Model
import { ADVERT_CONSTANTS } from '../models/Advert';

// APP Initia State
export const initialState = {
    // User session
    session: {},
    // User chats
    chats: [],
    // Control chat server connection
    socketIo: {
        onlineUsers: [],
        online: false
    },
    // Adverts in the app
    adverts: [],
    // Available tags in the backend
    tags: [],
    // Filters applied (text, tag, type, amounts)
    filters: {
        name: '',
        minPrice: 0,
        maxPrice: 0,
        type: ADVERT_CONSTANTS.TYPE.ALL, 
        tag: ADVERT_CONSTANTS.TAG.ALL,
        user: undefined,
    },
    // Last call statistics
    lastCall: {
        totalCount: -1,
        start: -1,
        end: -1,        
    },
    // UI State
    ui: {
        error: null,
        isAuthenticating: false,
        isFetchingChats: false,
        isFetching: false,
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        currentPage: 0,
    }
}