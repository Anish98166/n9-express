import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WebUser } from "../Schema/model.js";
import { secretKey } from "../utils/constant.js";
import { sendEmail } from "../utils/sendMail.js";

export const createWebUserController = async (req, res, next) => {
  try {
    let data = req.body;
    let password = req.body.password;
    let hashedPassword = await bcrypt.hash(password, 10);
    data = {
      ...data,
      password: hashedPassword,
      isVerifiedEmail: false,
    };

    let result = await WebUser.create(data);

    let infoObj = {
      _id: result._id,
    };

    let expiryInfo = {
      expiresIn: "1d",
    };

    let token = jwt.sign(infoObj, secretKey, expiryInfo);

    await sendEmail({
      to: data.email,
      subject: "Registration Successful",
      html: `
      <h1>Your account has been created successfully</h1>
      <a href="http://localhost:3000/verify-email?token=${token}" >"http://localhost:3000/verify-email?token=${token}</a>
      `,
    });

    res.json({
      success: true,
      message: "WebUser created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    //Get Token
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    //Verify Token

    let infoObj = await jwt.verify(token, secretKey);
    // console.log(infoObj);
    let userId = infoObj._id;

    let result = await WebUser.findByIdAndUpdate(userId, {
      isVerifiedEmail: true,
    });
    res.json({
      success: true,
      message: "Email verified successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginWebUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await WebUser.findOne({ email: email });

    if (!user) {
      throw new Error("User not found"); //user not found
    }

    if (!user.isVerifiedEmail) {
      throw new Error("Email not verified"); // when email not verified
    }

    let isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials"); //password does not match
    }

    // Generate Token
    let infoObj = {
      _id: user._id,
    };

    let expiryInfo = {
      expiresIn: "30d",
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    res.json({
      success: true,
      message: "WebUser login successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await WebUser.findById(_id);
    res.status(200).json({
      success: true,
      message: "WebUser profile read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let user = await WebUser.findByIdAndUpdate(_id, data, { new: true });
    res.status(200).json({
      success: true,
      message: "WebUser profile updated successfully",
      result: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res, next) => {
  //id
  //oldpassword
  //new password
  //compare
  //hash
  try {
    let _id = req._id;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let data = await WebUser.findById(id);

    let hashedPassword = data.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hashedPassword);
    if (isValidPassword) {
      let newHashedPassword = await bcrypt.hash(newPassword, 10);
      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: newHashedPassword },
        { new: true }
      );
      res.status(200).json({
        success: true,
        message: "WebUser password updated successfully",
        result: result,
      });
    } else {
      throw new Error("Password already updated");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    let email = req.body.email;

    let result = await WebUser.findOne({ email: email });
    // console.log(result);
    if (result) {
      //Generate Token
      let infoObj = {
        _id: result._id,
      };
      let expiryInfo = {
        expiresIn: "1d",
      };

      let token = await jwt.sign(infoObj, secretKey, expiryInfo);
      await sendEmail({
        to: email,
        subject: "Reset your password",
        html: `
      <h1>Please click this link to reset your password</h1>
      <a href="http://localhost:3000/reset-password?token=${token}" >"http://localhost:3000/reset-password?token=${token}</a>
      `,
      });
      res.status(200).json({
        success: true,
        message: "Password reset link has been sent to your email",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    // let _id = req._id;
    // let password = req.body.password;
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let result = await WebUser.findByIdAndUpdate(
      req._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "WebUser password reset successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.find({});
    res.json({
      success: true,
      message: "WebUser read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.findById(req.params.id);
    res.json({
      success: true,
      message: "WebUser specific read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificWebUserController = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    res.json({
      success: true,
      message: "WebUser updated successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWebUserController = async (req, res, next) => {
  try {
    let result = await WebUser.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "WebUser deleted successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
