"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccount = exports.changePassowrd = exports.verifyMailSender = exports.emailVerifyer = exports.userExists = exports.userRegisterHelper = exports.handleToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../utils/config");
const db_1 = require("../../../utils/db");
const drizzle_orm_1 = require("drizzle-orm");
const users_models_1 = require("../users.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
// SET AUTH COOKIE
const handleToken = (userData, res) => {
    const jwtToken = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        oauth: userData.password === null,
    };
    // Sign token
    const token = jsonwebtoken_1.default.sign(jwtToken, config_1.SECRET);
    const cookieRes = {
        secure: true,
        sameSite: "lax",
        maxAge: (1000 * 60 * 60 * 24 * 7),
        path: "/",
        // domain: ".recipe-recommender-backend.vercel.app",
        partitioned: !(jwtToken.oauth),
    };
    // Set cookie
    res.cookie("auth_token", token, cookieRes);
    console.log("cookie set");
    // Return user details
    return ({
        "success": true,
        "body": {
            "name": userData.name,
            "email": userData.email,
            "followers": userData.followers,
            "following": userData.following,
            "profile_pic": userData.profile_pic,
        }
    });
};
exports.handleToken = handleToken;
const userRegisterHelper = async (body) => {
    if (body?.password) {
        const saltRound = 10;
        // Hash password
        const passwordHash = await bcrypt_1.default.hash(body.password, saltRound);
        // Store hashed password
        body["password"] = passwordHash;
    }
    const userData = (await db_1.db.insert(users_models_1.userSchema).values(body).returning())[0];
    await db_1.db.insert(users_models_1.userPref).values({
        userId: userData.id,
    });
    return { success: true, body: userData };
};
exports.userRegisterHelper = userRegisterHelper;
const userExists = async (email) => {
    // Check for user with given email
    const userTmp = await (db_1.db.select().from(users_models_1.userSchema).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, email)));
    // Return resposne
    const res = {
        success: userTmp.length !== 0,
        body: userTmp[0] || "",
    };
    return res;
};
exports.userExists = userExists;
// CHECK IF VERIFY EMAIL WAS CORRECT
const emailVerifyer = async (jwtQuery) => {
    try {
        // Verify the query
        const data = jsonwebtoken_1.default.verify(jwtQuery, config_1.SECRET);
        let dbData;
        if (data.operation === "resetPassword") {
            // Fetch user info from PasswordReset Table
            const dbRes = (await db_1.db.delete(users_models_1.passwordResetSchema).where((0, drizzle_orm_1.eq)(users_models_1.passwordResetSchema.resetToken, jwtQuery)).returning())[0];
            dbData = await (0, exports.changePassowrd)(data.email, dbRes.newPassword);
        }
        else if (data.operation === "verifyAccount") {
            dbData = await (0, exports.verifyAccount)(data.email);
        }
        // Return both contents combined
        return ({
            success: true,
            body: { ...dbData?.body, ...data },
        });
    }
    // Invalid or exipred key
    catch (e) {
        return ({
            success: false,
            body: {
                message: "Error. Invalid or expired link",
            },
        });
    }
};
exports.emailVerifyer = emailVerifyer;
// SEND VERIFICATION EMAIL
const verifyMailSender = async (email, operation, newPassword) => {
    console.log(email);
    // If email is valid
    if (email !== "") {
        // Create payload with type of operation
        const jwtPayload = {
            "email": email,
            "operation": operation,
        };
        // Create token valid for 10 minutes
        const jwtToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.SECRET, {
            expiresIn: 600
        });
        let message = "";
        if (operation === "resetPassword") {
            // Insert it into a new database
            await db_1.db.insert(users_models_1.passwordResetSchema).values({ resetToken: jwtToken, newPassword: newPassword });
            message = "Reset your Password";
        }
        else
            message = "Verify your Account";
        // Get mail ready
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: config_1.EMAIL_ACCOUNT,
                pass: config_1.EMAIL_APP_PASS,
            }
        });
        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });
        // What and who to send
        const mailOptions = {
            from: config_1.EMAIL_ACCOUNT,
            to: email,
            subject: "Confirm email for Recipe Recommender App",
            html: `
			Click on the link below to <b>${message}</b> <br>
			https://recipe-recommender-backend.vercel.app/user/auth/verify/${jwtToken}
			`
        };
        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(info);
                }
            });
        });
        // Send mail
        // 	transporter.sendMail(mailOptions)
        // 		.then((resData) => console.log("done" + resData.response))
        // 		.catch((err) => new Error(err.message as string));
    }
    // Return send even if email is invalid
    return ({
        "success": true,
        "body": {
            "message": `Verification code send to ${email}. Valid for 10 minutes`
        }
    });
};
exports.verifyMailSender = verifyMailSender;
// Reset Password
const changePassowrd = async (email, newPassword) => {
    const hashPassword = await bcrypt_1.default.hash(newPassword, 10);
    const userData = (await db_1.db.update(users_models_1.userSchema).set({ password: hashPassword }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, email)))[0];
    return ({
        success: true,
        body: {
            message: `Password successfully changed for ${email}`
        }
    });
};
exports.changePassowrd = changePassowrd;
const verifyAccount = async (email) => {
    await db_1.db.update(users_models_1.userSchema).set({ verified: 1 }).where((0, drizzle_orm_1.eq)(users_models_1.userSchema.email, email));
    return ({
        success: true,
        body: {
            message: `Account verified for ${email}`
        }
    });
};
exports.verifyAccount = verifyAccount;
