const { randomNumberGenerator } = require("../../helpers");
const userModel = require("../../models/userModel");
const {
  confirmCodeSendMail,
  usernameGenerator,
} = require("../../services/userService");

const userController = {
  register: async (req, res, next) => {
    try {
      console.log("try");
      const email = req.body.email;
      const fullName = req.body.fullName;
      // const userDB = await user.findOne().where({
      //   email: email,
      // });
      // if (userDB) {
      //   throw new Error("Email is already taken");
      // }
      const confirmobj = await confirmCodeSendMail(email);
      const username = await usernameGenerator(fullName);
      const new_user = new userModel({
        email: email,
        username: username,
        fullName: fullName,
        confirmCode: confirmobj.confirmCode,
        confirmCodeExpDate: confirmobj.expDate,
      });
      new_user.save();
      res.json({
        ok: true,
        statusCode: 200,
        email: email,
      });
    } catch (error) {
      console.log("catch");
      next(error);
    }
  },
};

module.exports = userController;