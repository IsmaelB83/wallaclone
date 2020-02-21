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
            Advert.findOne({slug: req.params.slug})
            .then(advert => {
                // Chat creation
                let chat = new Chat({
                    advert: advert._id,
                    users: [req.user._id, advert.user._id],
                })
                chat.save()
                .then (chat => {
                    return res.status(201).json({
                        success: true,
                        description: 'Chat created',
                        result: chat
                    });
                })
            })
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
            // Get all chats for the authenticated user
            Chat.find({users: req.user._id})
            .select('advert, users')
            .populate('users', 'login name email avatar')
            .populate('advert', 'slug name thumbnail')
            .then (chats => {
                // Ok
                return res.status(201).json({
                    success: true,
                    description: 'success',
                    results: chats
                });
            })
        } catch (error) {
            next(error);
        }
    },

    /**
     * Retrieves all conversation for a specific chat id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        try {
            // Get chat conversation for a specific id and authenticated user
            Chat.find({_id: req.params.id, users: req.user._id})
            .select('advert, users messages')
            .populate('users', 'login name email avatar')
            .populate('advert', 'slug name thumbnail')
            .then (chat => {
                // Ok
                return res.status(201).json({
                    success: true,
                    description: 'success',
                    result: chats
                });
            })
        } catch (error) {
            next(error);
        }
    },
}