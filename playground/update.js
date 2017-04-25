const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('58ff78b59514701240bd700e')
    }, {
            $set: {
                name: 'John Smith'
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log('Added: ');
            console.log(JSON.stringify(result, undefined, 2));
        }, (error) => {
            console.log(error);
        });

    db.close();
});