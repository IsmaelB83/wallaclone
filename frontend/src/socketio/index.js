// Node
import io from 'socket.io-client';
// Own modules
import { getStore } from '../store';
import { SocketIoActions, ChatActions } from '../store/GlobalActions';

// Create socket
export const socket = io(process.env.REACT_APP_CHAT_URL, { autoConnect: false });

// On connect event handler
socket.on('disconnect', () => {
    const store = getStore();
    store.dispatch(SocketIoActions.disconnectedUser());
});

// On receive message
socket.on('message_received', data => {
    const store = getStore();
    const chats = store.getState().chats;
    const i = chats.findIndex(c => c._id === data.chatId );
    if (i < 0) {
        // This is a new chat created by a peer (need to reload from API)
        return store.dispatch(ChatActions.fetchUserChats());
    }
    // Existing chat add message
    store.dispatch(SocketIoActions.inMessage(data));
});

// Chat server emits this event to confirm the sender that the message is stored in mongo and sent to receiver
socket.on('message_sent', data => {
    const store = getStore();
    store.dispatch(SocketIoActions.outMessageSent(data));
});

// Chat server emits this event to confirm the sender that the receiver has read the pending messages
socket.on('messages_confirmed', data => {
    const store = getStore();
    store.dispatch(SocketIoActions.outMessagesConfirmed(data));
});

// Chat server emits to a new user as soon as it connects. Is the list of online users.
socket.on('all_online', onlineUsers => {
    const store = getStore();
    store.dispatch(SocketIoActions.connectedUser());
    store.dispatch(SocketIoActions.allOnlineUsers(onlineUsers));
});

// Chat server broadcast this event when someone connect to the server
socket.on('new_online', login => {
    const store = getStore();
    store.dispatch(SocketIoActions.onlineUser(login));
});

// Chat server broadcast this event when someone disconnect from the server
socket.on('new_offline', login => {
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
        socket.emit('online_user', login); 
    },
    // Disconnect
    disconnect: login => {
        socket.emit('offline_user', login); 
        socket.disconnect();
    },
    // Sends message to the server
    sendMessage: data => {
        const store = getStore();
        store.dispatch(SocketIoActions.outMessage(data));
        socket.emit('message', data);
    },
    // Confirms to server that a chat is completely read
    confirmChatRead: data => {
        socket.emit('chat_read', data);
    }
}