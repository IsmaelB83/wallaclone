'use strict';
// Node imports
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
* Advert in the database
*/
const AdvertSchema = new Schema(
    {  
       /**
        * Nombre del articulo en compra/venta
        */
        name: { type: String, required: true, max: 30, index: true },
        /**
        * Descripcion del articulo en venta
        */
        description: { type: String, max: 100 },
        /**
        * Precio del artículo
        */
        price: { type: Number, required: true },
        /**
        * Tipo de anuncio: compra o venta
        */
        type: { type: String, enum: ['buy', 'sell'], required: true, index: true },
        /**
        * Foto del artículo
        */
        photo: { type: String, required: true },
        /**
        * Thumbnail
        */
        thumbnail: { type: String, required: true },
        /**
        * Tags del anuncio
        */
        tags: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile', 'comic'], index: true},],
        /**
         * Booked product true/false
         */
        booked: { type: Boolean, required: false, default: false },
        /**
         * Sold product true/false
         */
        sold: { type: Boolean, required: false, default: false },
        /**
         * User
         */
        user: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        /**
        * Añade las propiedades de created y updated
        */
        timestamps: true,
    }    
);

/**
* Función estática para listar anuncios de la base de datos
* @param {String} name Para filtrado por nombre de anuncio
* @param {String} venta Para filtrado por anuncios de venta o compra
* @param {String} tag Para filtrado de anuncios con un tag específico
* @param {String} precio Para filtrado por precios
* @param {String} limit Para limitar el número de resultados a obtener
* @param {String} skip Para inidicar el número de resultados a saltar
* @param {String} fields Campos a obtener de la colección
* @param {String} sort Criterio de ordenación
* @param {function} callback Función a llamar al terminar la consulta
*
* Ejemplos de fields:
* http://localhost:3001/apiv1/anuncios?fields=name%20type%20price%20-_id
* http://localhost:3001/apiv1/anuncios?fields=name
* http://localhost:3001/apiv1/anuncios?fields=-_id
*/
AdvertSchema.statics.list = function(name, venta, tag, precio, limit, skip, fields, sort, callback) {
    try {
        // Genero filtrado
        let filter = {}
        if (name) filter.name = { '$regex': `^${name}`, '$options': 'i' };
        if (venta) filter.type = venta==='true'?'sell':'buy';
        if (tag) filter.tags = tag.toLowerCase();
        if (precio) {
            let aux = precio.split('-');
            if (aux.length === 2) {
                if(aux[0]==='') {
                    filter.price = {'$lte': aux[1]};
                } else if(aux[1]==='') {
                    filter.price = {'$gte': aux[0]};
                } else {
                    filter.price = {'$gte': aux[0], '$lte': aux[1]};
                }
            }
        }
        // Realizo la query a Mongo
        let queryDB = Advert.find(filter);
        queryDB.limit(limit);
        queryDB.skip(skip);
        queryDB.select(fields);
        // Permitir busquedas de mayor a menor
        if (sort) {       
            let aux = sort.split('-');
            if (aux.length === 2) {
                let sort = {};
                sort[aux[0]] = '-1';
                queryDB.sort(sort);
            } else {
                // Búsqueda de menor a mayor (por defecto)
                queryDB.sort(sort);
            }
        }
        queryDB.exec(callback);        
    } catch (error) {
        // Error no controlado
        console.log('Error while executing query.');
        console.log(error); 
        callback(error);
    }
}

/**
* Función estática para eliminar todos los anuncios
*/
AdvertSchema.statics.deleteAll = async function() {
    try {
        await Advert.deleteMany({});
    } catch (error) {
        // Error no controlado
        console.log('Error while deleting advert.');
        console.log(error);
    }
};

/**
* Función estática para insertar varios anuncios al mismo tiempo
*/
AdvertSchema.statics.insertAll = async function(adverts) {
    try {
        await Advert.insertMany(adverts);
    } catch (error) {
        // Error no controlado
        console.log('Error while inserting new advert.');
        console.log(error);
    }
};

/**
* Función estática para actualizar los datos de un anuncio
* @param {String} id ID que representa a un anuncio en MongoDB
* @param {Advert} newAdvert Objeto con los datos a modificar
*/
AdvertSchema.statics.updateAdvert = async function(id, newAdvert) {
    try {
        // Busco algún anuncio con ese id
        let advert = await Advert.findById(id);
        if (advert) {
            // Si viene el parametro en el body lo sobreescribo
            advert.name = newAdvert.name || advert.name;
            advert.price = newAdvert.price || advert.price;
            advert.type = newAdvert.type || advert.type;
            if (newAdvert.photo) {
                advert.photo = newAdvert.photo;
                advert.thumbnail = newAdvert.photo;
            } else {
                advert.photo = newAdvert.photo || advert.photo;
                advert.thumbnail = newAdvert.thumbnail || advert.thumbnail;
            }
            advert.tags = newAdvert.tags || advert.tags;
            advert.description = newAdvert.description || advert.description;
            advert.booked = newAdvert.booked || advert.booked;
            advert.sold = newAdvert.sold || advert.sold;
            // Salvo datos en mongo
            advert = await advert.save();
            return advert;
        }
        return false;
    } catch (error) {
        // Error no controlado
        console.log('Error while inserting new advert.');
        console.log(error);
    }
};


/**
* Creo un indice compuesto por tipo de anuncio (buy/sell) + tags
*/
AdvertSchema.index({ types: 1, tags: 1 });


const Advert = mongoose.model('Advert', AdvertSchema);
module.exports = Advert;