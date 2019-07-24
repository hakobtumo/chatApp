var socketIO = require('socket.io');
var db = require('./db');

function connect(server) {
  const io = socketIO(server);

  // TODO: Create namespaces
  usersNamespace(io);
}

// TODO: List namespace will provide list of logged in users
function usersNamespace(io) {
  const users = io.of('/users');
  users.on('connection', socket => {
    // TODO: add listener for starting chat
    socket.on('login', user => {
      socket.join(user.email)

      db.getClient().collection("student").findOneAndUpdate(
        { email: user.email },
        { $set: { 'LoggedIn': true } },
        { returnOriginal: false },
        function (err, results) {
          if (err) {
            socket.emit('list error', err)
          } else if (results.value == null) {
            socket.emit('list eror', { error: "Student with email" })
          } else {
            users.emit('logged in', results.value)
          }
        })
    })

    socket.on('disconnect', user => {
      socket.join(user.email)

      db.getClient().collection("student").findOneAndUpdate(
        { email: user.email },
        { $set: { 'LoggedIn': false } },
        { returnOriginal: false },
        function (err, results) {
          if (err) {
            socket.emit('list error', err)
          } else if (results.value == null) {
            socket.emit('list eror', { error: "Student with email" })
          } else {
            users.emit('logged out', results.value)
          }
        })
    })

    socket.on('log out', user => {
      socket.join(user.email)
      db.getClient().collection("student").findOneAndUpdate(
        { email: user.email },
        { $set: { 'LoggedIn': false } },
        { returnOriginal: false },
        function (err, results) {
          if (err) {
            socket.emit('list error', err)
          } else if (results.value == null) {
            socket.emit('list eror', { error: "Student with email" })
          } else {
            users.emit('logged out', results.value)
          }
        }
      )
    })
    // TODO: add listener to chat message

    // TODO: add listener for editor message WYSIWIG

    // TODO: add listener for drawing

    // TODO: add listener for logging in, update flag loggedIn in Database, join room

    // TODO: add listener on 'disconnect' to log out user, and emit

    // TODO: add listener for logout message, update db, emit

    // TODO: add listener to search query
    socket.on('query', (params, fn) => {
      // For a given search params, return student list
      console.log('query', params);
      let criteria = {};
      if (params.search) {
        const textCriteria = { $text: { $search: params.search } };
        const learningTargetCriteria = { learningTargets: params.search };
        criteria = { $or: [textCriteria, learningTargetCriteria] };
      }
      db.getClient().collection("students").find(criteria).sort({ loggedIn: -1 }).toArray(function (err, results) {
        if (err) {
          console.log('err', err);
          socket.emit('list error', err);
        } else {
          console.log('results', results);
          fn(results);
        }
      });
    });
  });

}

module.exports = {
  connect,
}
