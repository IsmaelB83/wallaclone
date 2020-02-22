// Actions
import * as ACTIONS from '../types/SocketIoTypes';

export const connectedUser = () => ({ type: ACTIONS.SOCKETIO_CONNECTED });
export const disconnectedUser = () => ({ type: ACTIONS.SOCKETIO_DISCONNECTED });
export const allOnlineUsers = onlineUsers => ({ type: ACTIONS.SOCKETIO_ALL_ONLINE_USERS, onlineUsers });
export const onlineUser = login => ({ type: ACTIONS.SOCKETIO_ONLINE_USER, login });
export const offlineUser = login => ({ type: ACTIONS.SOCKETIO_OFFLINE_USER, login });
export const incomingMessage = data => ({ type: ACTIONS.SOCKETIO_INCOMING_MESSAGE, data });
export const outgoingMessage = data => ({ type: ACTIONS.SOCKETIO_OUTGOING_MESSAGE, data });