const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter.js");
const PORT = process.env.PORT || 3030;
const path = require('path');

const jsonParser = express.json();

app.use(jsonParser);
app.use("/users", userRouter);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/index.html'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// app.use(function (req, res) {
//   res.status(404).send("Not Found");
// });

// app.use(function(err, req, res,) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT);
