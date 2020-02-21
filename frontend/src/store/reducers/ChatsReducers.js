// Imports
import * as TYPES from '../types/ChatTypes';
import * as SESSION from '../types/SessionTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre los chats
 * @param {Array} state Chats
 * @param {Object} action Action
 */
export function chats(state = initialState.chats, action) {
    switch (action.type) {
        // Initialization
        case TYPES.FETCH_USER_CHATS_FAILURE:
            return initialState.chats;
        // Fetch
        case TYPES.FETCH_USER_CHATS_SUCCESS:
            return [...action.chats];
        // Create
        case TYPES.CREATE_CHAT_SUCCESS:
            return [...state, action.chat];
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.chats;
        // Default
        default:
            return state;
    }
}