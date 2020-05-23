const User = require("../model/user.js");
const mysql = require("mysql2");

const user = new User();

const connection = mysql.createConnection({
  host: "sql2.freesqldatabase.com",
  user: "sql2341060",
  database: "sql2341060",
  password: "pE6!zN6%",
})

exports.getUsers = function (request, response) {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) return console.log(err);
    response.send(result);
  });
};

exports.createUser = function (request, response) {
  const userName = request.body.name;
  const userAge = request.body.age;

  connection.query("INSERT INTO users (name, age) VALUES (?,?)", [userName, userAge], (err, data) => {
    if (err) return console.log(err);

    connection.query(`SELECT * FROM users WHERE id = ${data.insertId}`, (err, result) => {
      if(err) return console.log(err);

      response.send(result);
    })
  });
};

exports.deleteUser = function (request, response) {
  const id = request.params.id;
  connection.query("DELETE FROM users WHERE id=?", [id], function(err, data) {
    if(err) return console.log(err);

    response.redirect("/users/");
  });
}

exports.test = async function (request, response) {
  await response.send(await user.testing())
}
