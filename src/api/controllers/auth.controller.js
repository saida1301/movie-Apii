const { findOne } = require("../models/user.model");
const { confirmCodeSendMail } = require("../services/user.service");
const { tokenGenerate } = require("../helpers/token.helper");


const authController = {
  confirmEmail: async (req, res, next) => {
    try {
      console.log("tryyyyy");
      const confirmCode = req.body.confirmCode;
      const email = req.body.email;
      const userdb = await findOne({
        email: email,
      });
      if (!userdb) {
        throw new Error("email not found");
      }

      let userConfirm = await findOne({
        email: email,
        confirmCode: confirmCode,
      });
      if (!userConfirm) {
        throw new Error("confoirm code error");
      }
      const confirmDate = new Date(userConfirm.confirmCodeExpDate);
      const nowDate = new Date();
      if (confirmDate - nowDate < 0) {
        throw new Error("Confirm code expired");
      }
      userdb.isConfirm = true;
      const token = tokenGenerate({
        email: userdb.email,
        username: userdb.username,
      });

      userdb.save();
      res.json({
        token: token,
        user: {
          email: userdb.email,
          username: userdb.username,
        },
      });
    } catch (error) {
      console.log("catchhhh");
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const email = req.body.email;
      const userDb = await findOne({
        email: email,
      });
      if (!userDb) {
        throw new Error("user not found");
      }
      if (!userDb.isConfirm) {
        throw new Error("email not confirmed");
      }
      const confirmobj = await confirmCodeSendMail(email);
      userDb.confirmCode = confirmobj.confirmCode;
      userDb.confirmCodeExpDate = confirmobj.expDate;
      userDb.save();
      res.json({
        ok: true,
        statusCode: 200,
        email: email,
      });
    } catch (error) {
      next(error);
    }
  },
};
 
module.exports = authController;