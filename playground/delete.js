const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }

    db.collection('Users').deleteMany({name: 'Mohamed Derhalli'}).then((result) => {
        console.log(result);
    }, (error) => {
        console.log('Error happened', error);
    });


    db.collection('Users').findOneAndDelete({_id: new ObjectID('58ff5aa3ea136f0a70073ac7')}).then((result) => {
        console.log(result);
    }, (error) => {
        console.log(error);
    });

    db.close();
});