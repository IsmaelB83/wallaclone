// Imports
import * as CHAT from '../types/ChatTypes';
import * as SESSION from '../types/SessionTypes';
import * as SOCKET from '../types/SocketIoTypes';
import { initialState } from '../InitialState';
import { CHAT_CONSTANTS } from '../../models/Chat';

/**
 * Reducer para gestionar las acciones sobre los chats
 * @param {Array} state Chats
 * @param {Object} action Action
 */
export function chats(state = initialState.chats, action) {
    switch (action.type) {
        // Initialization
        case CHAT.FETCH_USER_CHATS_FAILURE:
            return initialState.chats;
        // Fetch
        case CHAT.FETCH_USER_CHATS_SUCCESS:
            return [...action.chats];
        // Create
        case CHAT.CREATE_CHAT_SUCCESS:
            return [...state, action.chat];
        // Logout
        case SESSION.LOGOUT_SUCCESS:
        case SESSION.LOGOUT_FAILURE:
        case SESSION.DELETE_ACCOUNT_SUCCESS:
            return initialState.chats;
        case SOCKET.SOCKETIO_IN_MESSAGE: {
            const i = state.findIndex(c => c._id === action.data.chatId);
            if (i >= 0) {
                const aux = {...state[i]};
                aux.messages.push({
                    date: action.data.date,
                    text: action.data.text,
                    user: action.data.senderId
                });
                return [ ...state.slice(0, i), aux, ...state.slice(i + 1) ];
            }
            return state;
        }
        case SOCKET.SOCKETIO_OUT_MESSAGE: {
            const i = state.findIndex(c => c._id === action.data.chatId);
            if (i >= 0) {
                const aux = {...state[i]};
                aux.messages.push({
                    date: action.data.date,
                    text: action.data.text,
                    user: action.data.senderId,
                    status: CHAT_CONSTANTS.STATUS.WAIT
                });
                return [ ...state.slice(0, i), aux, ...state.slice(i + 1) ];
            }
            return state;
        }
        case SOCKET.SOCKETIO_OUT_MESSAGE_SENT: {
            const i = state.findIndex(c => c._id === action.data.chatId);
            if (i >= 0) {
                // Look for the last message to delete de waiting confirmation flag
                const chat = {...state[i]};
                for (let j = chat.messages.length - 1; j >= 0; j--) {
                    const message = chat.messages[j];
                    if (message.status === CHAT_CONSTANTS.STATUS.WAIT && message.text === action.data.text) {
                        chat.messages[j] = {
                            ...message, 
                            status: CHAT_CONSTANTS.STATUS.SENT
                        };
                    }
                }
                return [ ...state.slice(0, i), chat, ...state.slice(i + 1) ]
            }
            return state;
        }
        case SOCKET.SOCKETIO_OUT_MESSAGES_CONFIRMED: {
            // Look for the chat received
            const i = state.findIndex(c => c._id === action.data.chatId);
            if (i >= 0) {
                // All messages confirmed
                const chat = {...state[i]};
                chat.messages = chat.messages.map ((m, i) => ({
                    ...m, 
                    status: CHAT_CONSTANTS.STATUS.ACK
                }));
                return [ ...state.slice(0, i), chat, ...state.slice(i + 1) ]
            }
            return state;
        }
        default:
            return state;
    }
}