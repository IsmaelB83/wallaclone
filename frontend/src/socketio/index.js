// Node
import io from 'socket.io-client';
// Own modules
import { getStore } from '../store';
import { SocketIoActions, ChatActions } from '../store/GlobalActions';

// Create socket
export const socket = io(process.env.REACT_APP_CHAT_URL, { autoConnect: false });

// On connect event handler
socket.on('connect', () => {
    const store = getStore();
    store.dispatch(SocketIoActions.connectedUser());
});

// On connect event handler
socket.on('disconnect', () => {
    const store = getStore();
    store.dispatch(SocketIoActions.disconnectedUser());
});

// On receive message
socket.on('message', data => {
    const store = getStore();
    const chats = store.getState().chats;
    const i = chats.findIndex(c => c._id === data.chatId );
    if (i < 0) {
        // This is a new chat created by a peer (need to relad from API)
        return store.dispatch(ChatActions.fetchUserChats());
    }
    // Existing chat add message
    store.dispatch(SocketIoActions.incomingMessage(data));
});

// On broadcast user is online dispatch online user
socket.on('online', login => {
    const store = getStore();
    store.dispatch(SocketIoActions.onlineUser(login));
});

// On broadcast user is online dispatch online user
socket.on('online_all', onlineUsers => {
    const store = getStore();
    store.dispatch(SocketIoActions.allOnlineUsers(onlineUsers));
});

// On broadcast user is offline dispatch offline user
socket.on('offline', login => {
    const store = getStore();
    store.dispatch(SocketIoActions.offlineUser(login));
});

// On receive status
socket.on('status', data => console.log(data));

// Default
export default {
    // Connect
    connect: login => {
        socket.connect();
        socket.emit('online', login); 
    },
    // Disconnect
    disconnect: login => {
        socket.emit('offline', login); 
        socket.disconnect(login);
    },
    // Sends message to the server
    sendMessage: data => {
        const store = getStore();
        store.dispatch(SocketIoActions.outgoingMessage(data));
        socket.emit('message', data);
    }
}