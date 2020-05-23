const express = require("express");
const userController = require("../controller/userController.js");
const userRouter = express.Router();

// userRouter.use('/test', async (request, response) => {
//     await userController.test(request, response);
// });
userRouter.use('/test', userController.test);
userRouter.use('/createUser', userController.createUser);
userRouter.use('/deleteUser/:id', userController.deleteUser);
userRouter.use("/", userController.getUsers);

module.exports = userRouter;
