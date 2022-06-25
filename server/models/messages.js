var db = require('../db');

module.exports = {
  getAll: function (err, callback) {
    if (err) {
      callback(err);
      return;
    }
    // invoke the query function using db
    // query should select content, roomname and username columns
    db.query('SELECT users.username, messages.roomname, messages.content FROM ' +
    'users INNER JOIN messages ON users.id = messages.users_id', (err, results, fields) => {
      if (err) {
        callback(err);
      } else {
        // transform
        results = results.map((object, i) => {
          return {
            username: object.username,
            text: object.content,
            roomname: object.roomname,
            'message_id': i,
          };
        });
        console.log(results);
        callback(null, results);
      }
    });
  },
  create: function (err, {username, text, roomname}, callback) {
    if (err) {
      callback(err);
      return;
    }

    let placeholder = [text, roomname, username];

    db.query('INSERT INTO messages (users_id, content, roomname) SELECT id, ?, ? FROM users WHERE username = ?', placeholder, (err, results, fields) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};

