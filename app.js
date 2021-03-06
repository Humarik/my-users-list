const express = require("express");
const userRouter = require("./routes/userRouter.js");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT);
const io = require('socket.io')(server);

const jsonParser = express.json();

app.use(jsonParser);
app.use("/users", userRouter);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  socket.on('createUser', (user) => {
    socket.broadcast.emit('createUser', user);
  });
  socket.on('removeUser', (users) => {
    socket.broadcast.emit('removeUser', users);
  });
});


// app.use(function (req, res) {
//   res.status(404).send("Not Found");
// });

// app.use(function(err, req, res,) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
