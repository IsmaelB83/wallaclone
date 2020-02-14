"use strict";

module.exports = {
    // Web Routes
    WebUserRoutes: require('./User'),
    WebAdvertRoutes: require('./Advert'),
    // API Routes
    AuthRoutes: require('./apiv1/Auth'),
    UserRoutes: require('./apiv1/User'),
    AdvertRoutes: require('./apiv1/Advert'),
    ChatRouter: require('./apiv1/Chat')
}