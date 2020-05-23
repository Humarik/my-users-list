const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "sql2.freesqldatabase.com",
    user: "sql2341060",
    database: "sql2341060",
    password: "pE6!zN6%",
})

module.exports = class User {
    async testing() {
        let data = new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users", (err, result) => {
                if (err) return console.log(err);
                resolve(result);
            });
        });
        return await data;
    }
}