var models = require('../models'); // require server/models/index.js
// models itself includes messages.js and users.js
// models.users.getAll
// models.users.create
// models.messages.getAll
// models.messages.create

// controllers/users.js
// .. means, go back one directory
// no longer in controllers directory
// now servers

// now we're looking for servers/models
// if a file isn't specified: choose index.js

module.exports = {
  get: function (req, res) {
    models.users.getAll(null, (err, usernames) => {
      if (err) {
        res.status(503).end();
      } else {
        res.status(200).json(usernames);
      }
    });
  },
  post: function (req, res) {
    const username = req.body.username;
    models.users.create(null, username, (err) => {
      if (err) {
        res.status(503).end();
      } else {
        res.status(201).end();
      }
    });
  }
};
