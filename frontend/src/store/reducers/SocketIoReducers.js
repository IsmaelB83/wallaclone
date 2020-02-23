// Imports
import * as TYPES from '../types/SocketIoTypes';
import { initialState } from '../InitialState';

/**
 * Reducer para gestionar las acciones sobre onlineUsers
 * @param {Array} state Chats
 * @param {Object} action Action
 */
export function socketIo(state = initialState.socketIo, action) {
    switch (action.type) {
        case TYPES.SOCKETIO_CONNECT: 
        case TYPES.SOCKETIO_DISCONNECT: 
            return initialState.socketIo;
        case TYPES.SOCKETIO_CONNECTED_USER: 
            return { ...initialState.socketIo, online: true };
        case TYPES.SOCKETIO_DISCONNECTED_USER: 
            return initialState.socketIo;
        case TYPES.SOCKETIO_ALL_ONLINE_USERS:
                return { ...state, online: true, onlineUsers: [...action.onlineUsers] };
        case TYPES.SOCKETIO_ONLINE_USER: {
            const i = state.onlineUsers.indexOf(action.login);
            let auxOnlineUsers = [...state.onlineUsers];
            if (i < 0) auxOnlineUsers = [...state.onlineUsers, action.login]
            return { ...state, onlineUsers: auxOnlineUsers };
        }
        case TYPES.SOCKETIO_OFFLINE_USER: {
            const i = state.onlineUsers.indexOf(action.login);
            let auxOnlineUsers = [...state.onlineUsers];
            if (i >= 0) auxOnlineUsers = [ ...state.onlineUsers.slice(0, i), ...state.onlineUsers.slice(i + 1) ];
            return { ...state, onlineUsers: auxOnlineUsers };
        }
        default:
            return state;
    }
}