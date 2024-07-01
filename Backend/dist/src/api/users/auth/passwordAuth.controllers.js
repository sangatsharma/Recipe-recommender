"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.changePasswordHandler = exports.verifyEmailHandler = exports.userLoginHandler = exports.userRegisterHandler = void 0;
const auth_helpers_1 = require("./auth.helpers");
const auth_helpers_2 = require("./auth.helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRegisterHandler = async (req, res, next) => {
    // Get credentails
    const body = req.body;
    // Email and Password are required
    //TODO: Check for all required fields
    if (!body?.email || !body?.password || !body?.name) {
        return res.json({
            "success": false,
            "body": {
                "message": "Empty fields",
            },
        });
    }
    const cleanedBody = {
        email: body.email,
        password: body.password,
        name: body.name
    };
    try {
        // Register user
        const userData = await (0, auth_helpers_1.userRegisterHelper)(cleanedBody);
        // Generate token
        const userRes = (0, auth_helpers_1.handleToken)(userData.body, res);
        await (0, auth_helpers_1.verifyMailSender)(userRes.body.email, "verifyAccount");
        return res.json(userRes);
    }
    catch (err) {
        next(err);
    }
};
exports.userRegisterHandler = userRegisterHandler;
/*
  LOGIN USER
*/
const userLoginHandler = async (req, res, next) => {
    const body = req.body;
    // Email and Password are required
    if (!body?.email || !body?.password) {
        return res.json({
            "success": false,
            "body": {
                "message": "All fields are required",
            },
        });
    }
    try {
        // Check if user exists or not
        const userTmp = await (0, auth_helpers_2.userExists)(body.email);
        if (!userTmp.success) {
            return res.json({
                "success": false,
                "body": {
                    "message": "User with this email dosen't exist",
                },
            });
        }
        // TODO:Error codes insted of generic messages
        else if (userTmp.body.password === null) {
            return res.json({
                success: false,
                body: {
                    message: "Use OAuth",
                }
            });
        }
        const userData = userTmp.body;
        // Compare to validate password
        const passswordCorrect = await bcrypt_1.default.compare(body.password, userData.password);
        if (!passswordCorrect) {
            return res.json({
                "success": false,
                "body": {
                    "message": "Incorrect password",
                },
            });
        }
        // Generate token, save as cookie
        const userToken = (0, auth_helpers_1.handleToken)(userData, res);
        return res.json(userToken);
    }
    catch (e) {
        next(e);
    }
};
exports.userLoginHandler = userLoginHandler;
// VERIFICATION EMAILS
const verifyEmailHandler = async (req, res, _) => {
    // Get token from url param
    const jwtParam = req.params.jwt;
    // Verify email
    const jwtVerify = await (0, auth_helpers_1.emailVerifyer)(jwtParam);
    if (!jwtVerify.success)
        return res.json(jwtVerify);
    return res.render("index", { prop: jwtVerify });
};
exports.verifyEmailHandler = verifyEmailHandler;
/*
  RESET PASSWORD
  USAGE: POST REQ TO /user/auth/password-reset WITH :
    {
      email, newPassword,confirmNewPassword
    }
  Email will be send to provided mail with confirm link.

*/
const changePasswordHandler = async (req, res, next) => {
    const body = req.body;
    if (!body?.email || !body?.newPassword || !body?.confirmNewPassword) {
        return res.send({
            success: false,
            body: {
                message: "Incomplete fields",
            }
        });
    }
    else if (body.newPassword !== body.confirmNewPassword) {
        return res.send({
            success: false,
            body: {
                message: "Password and confirm password donot match",
            }
        });
    }
    const userTmp = await (0, auth_helpers_2.userExists)(body.email);
    const userData = userTmp.body;
    if (!userTmp.success) {
        userData.email = "";
    }
    else if (userTmp.body.password === null) {
        return res.json({
            success: false,
            body: {
                message: "Use OAuth",
            }
        });
    }
    try {
        const verifyResponse = await (0, auth_helpers_1.verifyMailSender)(userData.email, "resetPassword", body.newPassword);
        return res.json(verifyResponse);
    }
    catch (err) {
        next(err);
    }
};
exports.changePasswordHandler = changePasswordHandler;
/*
  LOG USER OUT
  WARNING: THIS DOSEN'T INVALIDATE THE TOKEN
*/
const logoutHandler = (req, res, _) => {
    // Clear cookie
    // const cookieRes = {
    //   secure: true,
    //   sameSite: "none",
    //   path: "/",
    //   partitioned: true,
    // } as CookieOptions;
    // res.cookie("auth_token", "", cookieRes);
    let cookieRes = "auth_token=; Path=/; Secure; Expires=Thu, 27 Jun 1970 13:52:54 GMT; SameSite=None; Domain=.recipe-recommender-backend.vercel.app;";
    cookieRes = cookieRes + `Demo=${res.locals.user}`;
    if (!(res.locals.user.oauth)) {
        cookieRes = cookieRes + "Partitioned;";
    }
    res.set("Set-Cookie", cookieRes);
    // Send success message
    res.json({
        success: true,
        body: {
            message: "Successfully loggedout",
        },
    });
};
exports.logoutHandler = logoutHandler;
