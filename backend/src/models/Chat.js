'use strict';
// Node imports
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId; 
const Schema = mongoose.Schema;

/**
* Chat in the database
*/
const ChatSchema = new Schema(
    {  
        // Anuncio relacionado con el chat
        advertId: { type: Schema.Types.ObjectId, ref: 'Advert', required: true},
        // Creator of the chat
        chatOwnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // Creator of the chat
        advertOwnerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        // Messages
        conversation: [{
            // Message date
            date: { type: Schema.Types.Date, required: true, default: Date.now},
            // User
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            // Message message
            message: { type: Schema.Types.String, required: true}
        }]
    },
    {
        // Añade las propiedades de created y updated
        timestamps: true,
    }    
);

/**
* Función estática para eliminar todos los anuncios
*/
ChatSchema.statics.deleteAll = async function() {
    return await Chat.deleteMany({});
};

/**
* Insert a conversation into a chat
* @param {String} id Chat id to insert conversation to
* @param {Chat} text String to add to conversation
*/
ChatSchema.statics.insertConversation = async function(id, text) {
    let Chat = await Chat.findById(id).populate('chatOwnerId').populate('advertOwnerId');
    if (chat) {
        chat.conversation.push = { text: text };
        chat.save()
        .then (result => result)
        .catch (error => error)
    }
    return false;
};

ChatSchema.index({ ChatId: 1, creatorId: 1 }, { unique: true });

const Chat = mongoose.model('ChatSchema', ChatSchema);

module.exports = Chat;