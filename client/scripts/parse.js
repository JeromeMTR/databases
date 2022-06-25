// The Parse object represents your connection to outside world!
// Or... just the Parse API. Populate this object with methods
// which send requests to the RESTful Parse API.

var Parse = {

  // TODO: set this url to our own local server
  server: `https://app-hrsei-api.herokuapp.com/api/chatterbox/messages/${window.CAMPUS}`,

  create: function(message, successCB, errorCB = null) {

    $.ajax({
      url: Parse.server,
      type: 'POST',
      // var message = {
      //   username: App.username,
      //   text: FormView.$form.find('#message').val(),
      //   roomname: Rooms.selected || 'lobby'
      // };
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};