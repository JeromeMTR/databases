var models = require('../models');
// models.messages.getAll
// models.messages.create
// models.users.getAll
// models.users.create

// request handlers : I'm getting a request (GET request to /messages/)
//                    What should my response be?
module.exports = {
  // response should include the 'get'ted messages
  // aim: send back the fetched messages
  get: function (req, res) {}, // a function which handles a get request for all messages
  // request will be holding the message as data
  // aim: store incoming message in db
  post: function (req, res) {
    const message = req.body;
    console.log(req.body);
    models.users.getAll(null, (err, usernames) => {
      if (err) {
        res.status(503).end();
      } else if (!usernames.includes(message.username)) {
        models.users.create(err, message.username, (err) => {
          models.messages.create(err, message, (err) => {
            if (err) {
              res.status(503).end();
            } else {
              console.log('congratulations you did it');
              res.status(201).end();
            }
          });
        });
      } else {
        models.messages.create(err, message, (err) => {
          if (err) {
            res.status(503).end();
          } else {
            console.log('congratulations you did it');
            res.status(201).end();
          }
        });
      }
    });

  } // a function which handles posting a message to the database
};
