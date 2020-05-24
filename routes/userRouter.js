const express = require("express");
const userController = require("../controller/userController.js");
const userRouter = express.Router();

userRouter.use('/createUser', userController.createUser);
userRouter.use('/deleteUser/:id', userController.removeUser);
userRouter.use("/", userController.getUsers);

module.exports = userRouter;
