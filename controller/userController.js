const User = require("../model/user.js");

const user = new User();

exports.getUsers = async function (request, response) {
  try {
    await response.send(await user.getUsers());
  } catch (error) {
    await response.send(error);
  }
};

exports.createUser = async function (request, response) {
  const {name, age} = request.body;

  try{
    await response.send(await user.createUser(name, age))
  }catch(error) {
    await response.send(error);
  }
};

exports.removeUser = async function (request, response) {
  const { id } = request.params;

  try{
    await await user.removeUser(id)
    await response.redirect("/users/")
  }catch(error) {
    await response.send(error);
  }
}
