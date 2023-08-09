const client = require('../config/mongodb');

const findDocuments = (collectionName, query, callback)=>{
    const collection = client.db().collection(collectionName);
    collection.find(query).toArray((err, docs)=>{
        if (err){
            console.error(err);
            return callback(err);
        }
        callback(null, docs);
    })
}