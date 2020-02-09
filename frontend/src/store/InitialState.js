// APP Initia State
export const initialState = {
    // User session
    session: {},
    // Adverts in the app
    adverts: [],
    // Available tags in the backend
    tags: [],
    // User adverts
    published: [],
    // User favorites
    favorites: [],
    // Filters applied (text, tag, type, amounts)
    filters: {
        name: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        type: undefined, 
        tag: undefined,
        apiCount: -1,
        start: -1,
        end: -1,
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