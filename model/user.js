const mongoose = require('mongoose');

mongoose
    .connect(
        'mongodb+srv://hurma:378021@cluster-hurma-hd5g5.mongodb.net/hurma?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('DB connected'));

const UsersChema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const users = mongoose.model('users', UsersChema)

module.exports = class User {
    async getUsers() {
        return await users.find()
    }

    async createUser(name, age) {
        return await users.create({ name, age});
    }

    async removeUser(_id) {
        return await users.remove({_id})
    }
}