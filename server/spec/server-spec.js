/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();

    const tablename = 'messages'; // TODO: fill this out
    const usersTablename = 'users'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query('DELETE FROM messages WHERE id > 0', () => {
      dbConnection.query('DELETE FROM users WHERE id > 0', done);
    });
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const text = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, text, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          // Should have one result:
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].content).toEqual(text);
          done();
        });
      })
      .catch((err) => {
        console.log('i\'m an error');
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    const message = {
      username: 'testman',
      text: 'works',
      roomname: 'test'
    };
    axios.post(`${API_URL}/messages`, message)
      .then(() => axios.get(`${API_URL}/messages`))
      // Now query the Node chat server and see if it returns the message we just inserted:
      .then((response) => {
        const messageLog = response.data;
        expect(messageLog[messageLog.length - 1].content).toEqual(message.test);
        expect(messageLog[messageLog.length - 1].roomname).toEqual(message.roomname);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should create a user if user does not exist', (done) => {
    let username = 'Help Desk';
    axios.post(`${API_URL}/users`, {username})
      .then(() => {
        return axios.get(`${API_URL}/users`);
      })
      .then((userArray) => {
        userArray = userArray.data;
        expect(userArray[userArray.length - 1]).toEqual(username);
        done();
      });
  });

  it('Should return a list of all users upon get request', (done) => {
    axios.get(`${API_URL}/users`)
      .then((response) => {
        let usernames = response.data;
        expect(usernames.includes('Help Desk')).toEqual(true);
        expect(usernames.includes('testman')).toEqual(true);
        expect(usernames.includes('Valjean')).toEqual(true);
        done();
      });
  });
});
