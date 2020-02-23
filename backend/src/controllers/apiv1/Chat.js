'use strict';
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
        // Every chat is attached to an advert
        Advert.findOne({slug: req.params.slug})
        .then(advert => {
            if (!advert) {
                return next({
                    status: 404,
                    description: 'Advert not found'
                });
            }
            // Create model chat and save in mongo
            let chat = new Chat({
                advert: advert._id,
                users: [req.user._id, advert.user._id],
            })
            chat.save()
            .then (chat => {
                res.status(201).json({
                    success: true,
                    result: chat
                });
            })
        })
        .catch (err => next(error));
    },

    /**
     * Retrieves all chats for a user
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    list: async (req, res, next) => {
        // Get all chats for the authenticated user
        Chat.find({users: req.user._id})
        .select('advert, users, messages')
        .populate('users', '_id login name email avatar')
        .populate('advert', '_id slug name thumbnail')
        .then (chats => {
            res.status(201).json({
                success: true,
                results: chats
            });
        })
    .catch(err => next(err));
    },

    /**
     * Retrieves all conversation for a specific chat id
     * @param {Request} req Request web
     * @param {Response} res Response web
     * @param {Middleware} next Next middleware
     */
    select: async (req, res, next) => {
        // Get chat conversation for a specific id and authenticated user
        Chat.findOne({_id: req.params.id, users: req.user._id})
        .select('advert, users messages')
        .populate('users', '_id login name email avatar')
        .populate('advert', '_id slug name thumbnail')
        .then (chat => {
            if(!chat) {
                return next({
                    status: 404,
                    description: 'Chat nof found'
                })
            }
            res.status(201).json({
                success: true,
                result: chat
            });
        })
    .catch(err => next(err));
    },
}