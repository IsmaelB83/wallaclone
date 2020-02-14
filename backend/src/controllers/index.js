"use strict";


module.exports = {
    // Web Controllers
    WebUserCtrl: require('./User'),
    WebAdvertCtrl: require('./Advert'),
    // API Controllers
    ChatCtrl: require('./apiv1/Chat'),
    AuthCtrl: require('./apiv1/Auth'),
    UserCtrl: require('./apiv1/User'),
    AdvertCtrl: require('./apiv1/Advert'),
}