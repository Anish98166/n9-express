import { Router } from "express";
import {
  createWebUserController,
  deleteWebUserController,
  forgotPassword,
  loginWebUser,
  myProfile,
  readSpecificWebUserController,
  readWebUserController,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSpecificWebUserController,
  verifyEmail,
} from "../controllers/webUserController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import isAuthorization from "../middleware/isAuthorization.js";

let webUserRouter = Router();

webUserRouter.route("/").post(createWebUserController);
webUserRouter
  .route("/")
  .get(
    isAuthenticated,
    isAuthorization(["admin", "superAdmin"]),
    readWebUserController
  );
webUserRouter.route("/verify-email").post(verifyEmail);
webUserRouter.route("/login").post(loginWebUser);
webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);
webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);
webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);
webUserRouter.route("/forgot-password").post(forgotPassword);
webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

//Dynamic routes
webUserRouter
  .route("/:id")
  .get(
    isAuthenticated,
    isAuthorization(["admin", "superAdmin"]),
    readSpecificWebUserController
  );
webUserRouter
  .route("/:id")
  .post(
    isAuthenticated,
    isAuthorization(["superAdmin"]),
    updateSpecificWebUserController
  );
webUserRouter
  .route("/:id")
  .delete(
    isAuthenticated,
    isAuthorization(["superAdmin"]),
    deleteWebUserController
  );

export default webUserRouter;
