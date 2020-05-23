const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "bosziaf2gxbaeepsrtf2-mysql.services.clever-cloud.com",
    user: "ur5sm2iith67ybq6",
    database: "bosziaf2gxbaeepsrtf2",
    password: "puiL7Pk8zjyOhVGQuFe4",
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