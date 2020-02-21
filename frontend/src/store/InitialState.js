// APP Initia State
export const initialState = {
    // User session
    session: {},
    // User chats
    chats: [],    
    // Adverts in the app
    adverts: [],
    // Available tags in the backend
    tags: [],
    // Filters applied (text, tag, type, amounts)
    filters: {
        name: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        type: undefined, 
        tag: undefined,
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
        isFetchingDetail: false,
        isFetching: false,
        isUpdating: false,
        isCreating: false,
        isDeleting: false,
        currentPage: 0,
    }
}