'use strict';
// Node imports
const mongoose = require('mongoose');
// Own imports


const database = {
    /**
     * Conectar a mongo
     */
    connect: async (connection) => {
        mongoose.set('useCreateIndex', true);
        await mongoose.connect(connection, { 
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });
        return mongoose.connection;
    },
    /**
     * Desconectar de mongo
     */
    disconnect: () => {
        mongoose.connection.close();
    }
}

module.exports = database;
