const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodosApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to DB', err);
    }

  db.collection('Users').find().toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
      console.log('Unable to get users', err)
  })


    db.close();
});