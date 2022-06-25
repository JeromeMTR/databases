var db = require('../db');

module.exports = {
  getAll: function (err, callback) {
    if (err) {
      callback(err);
      return;
    }
    // get all usernames in users
    db.query('SELECT username FROM users', (err, results) => {
      if (err) {
        callback(err);
      } else {
        // [
        //   TextRow { username: 'cornelius' },
        //   TextRow { username: 'jerome' },
        //   TextRow { username: 'HR' }
        // ]
        // transform the above into an array of usernames
        // ['cornelius', 'jerome', 'HR']
        results = results.map((object) => {
          return object.username;
        });
        callback(null, results);
      }
    });
  },
  create: function (err, username, callback) {
    if (err) {
      callback(err);
      return;
    }
    db.query('INSERT INTO users (username) VALUES (?)', [username], (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};
