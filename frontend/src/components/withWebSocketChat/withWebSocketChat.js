// Node
import React, { Component } from 'react';
import io from 'socket.io-client';

// Contexto generado por el HOC
export const Context = React.createContext();


// HOC that creates a component with websocket capabilities. Using socket.io
const withWebSocketChat = (WrappedComponent) => {
    
    return class WithWebSockets extends Component {
       
        constructor(props) {
            super(props);
            // Create socket
            const socket = io(process.env.REACT_APP_CHAT_URL, { autoConnect: false });
            // Event listeners
            socket.on('connect', () => console.log('Connected to chat server'));
            socket.on('disconnect', () => console.log('Disconnected from chat server'));
            socket.on('status', data => console.log(data));
            socket.on('message', data => console.log(data));
            socket.on('online', data => this.onlineBroadcastHandler(data));
            socket.on('offline', data => this.offlineBroadcastHandler(data));
            // Store
            this.state = { 
                online: [],
                socket: socket 
            };
        }
        
        // User online broadcast
        onlineBroadcastHandler = login => {
            const online = this.state.online;
            const i = online.indexOf(login);
            if (i<0) {
                online.push(login)
                this.setState({online}/* , () => console.log(this.state.online) */);
            } 
        }

        // User offline broadcast
        offlineBroadcastHandler = login => {
            const online = this.state.online;
            const i = online.indexOf(login);
            if (i>=0) {
                online.splice(i,1)
                this.setState({online}/* , () => console.log(this.state.online) */);
            } 
        }

        // Connect
        connect = login => {
            this.state.socket.connect();
            this.state.socket.emit('online', login); 
        }

        // Disconnect
        disconnect = login => {
            this.state.socket.emit('offline', login); 
            this.state.socket.disconnect(login);
        }

        // Sends message to the server
        sendMessage = data => this.state.socket.emit('message', data);        

        // Join chat room in server
        joinChatRoom = room => this.state.socket.emit('join_chat', room);
        
        // Leave chat room in server
        leaveChatRoom = room => this.state.socket.emit('leave_chat', room);

        // Render
        render() {
            return (
                <Context.Provider value={{ 
                    online: this.state.online,
                    connect: this.connect,
                    disconnect: this.disconnect,
                    sendMessage: this.sendMessage,
                    joinChatRoom: this.joinChatRoom,
                    leaveChatRoom: this.leaveChatRoom,
                }}>
                    <WrappedComponent {...this.props} chatConnect={this.connect} chatDisconnect={this.disconnect}/>;
                </Context.Provider>
            );
        };
    }
}
       
// Export
export default withWebSocketChat;