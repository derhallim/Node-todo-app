const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }

    // db.collection('Todos').insertOne({
    //     text: 'Something sweet to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert to do item', error)

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    db.collection('Users').insertOne({
            name: 'Mohamed Derhalli', 
            age : 30, 
            location: 'Mars'
        },
        (error, result) => {
            if (error)
                return console.log('Unable to add user', error);

            console.log(JSON.stringify(result.ops, undefined, 2));
        })


    db.close();
});