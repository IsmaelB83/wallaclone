"use strict";
// Node imports
// Own imports
const { Chat, Advert } = require('../../models');

/**
 * Controller object
 */
module.exports = {

    /**
     * Creates a new chat in the database. 
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    create: async (req, res, next) => {
        try {
            // Every chat is attached to an advert
            const advert = await Advert.findOne({slug: req.params.slug});
            // Model creation
            let chat = new Chat({
                advertId: advert._id,
                chatOwnerId: req.user._id,
                advertOwnerId: advert.user._id
            })
            // Chat creation
            chat = await chat.save();
            if (chat) {
                // Ok
                return res.status(201).json({
                    description: 'Chat created',
                    chat
                });
            }
            // Error
            next({
                status: 400,
                description: 'Error creating chat'
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * Retrieves all chats for a user
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    list: async (req, res, next) => {
        try {
            // Every chat is attached to an advert
            const chats = await Chat
            .find({chatOwnerId: req.user._id})
            .populate('chatOwnerId', 'login name email')
            .populate('advertOwnerId', 'login name email')
            .populate('advertId', 'slug name thumbnail');
            if (chats) {
                // Ok
                return res.status(201).json({
                    description: 'success',
                    chats
                });
            }
            // Error
            next({
                status: 400,
                description: 'Error retrieving chats'
            });
        } catch (error) {
            next(error);
        }
    },
}