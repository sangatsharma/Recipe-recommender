import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";

import nodemailer, { Transporter } from "nodemailer";

import { EMAIL_ACCOUNT, EMAIL_APP_PASS, SECRET } from "@/utils/config";
import { RegisterForm, UserDataDB } from "../users.types";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { passwordResetSchema, userPref, userSchema } from "../users.models";

import bcrypt from "bcrypt";

// SET AUTH COOKIE
export const handleToken = (userData: UserDataDB, res: Response) => {
  const jwtToken = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    oauth: userData.password === null,
  };

  // Sign token
  const token = jwt.sign(jwtToken, SECRET);

  const cookieRes = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
    domain: ".vercel.app",
    partitioned: !jwtToken.oauth,
  } as CookieOptions;

  // Set cookie
  res.cookie("auth_token", token, cookieRes);

  // Return user details
  return {
    success: true,
    body: {
      name: userData.name,
      email: userData.email,
      followers: userData.followers,
      following: userData.following,
      profile_pic: userData.profile_pic,
    },
  };
};

export const userRegisterHelper = async (body: RegisterForm) => {
  if (body?.password) {
    const saltRound = 10;

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, saltRound);

    // Store hashed password
    body["password"] = passwordHash;
  }

  const userData: UserDataDB = (
    await db.insert(userSchema).values(body).returning()
  )[0];
  await db.insert(userPref).values({
    userId: userData.id,
  });
  return { success: true, body: userData };
};

export const userExists = async (email: string) => {
  // Check for user with given email
  const userTmp = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, email));

  // Return resposne
  const res = {
    success: userTmp.length !== 0,
    body: userTmp[0] || "",
  };

  return res;
};

// CHECK IF VERIFY EMAIL WAS CORRECT
export const emailVerifyer = async (jwtQuery: string) => {
  try {
    type EmailVerifyJwt = {
      email: string;
      operation: string;
      iat: number;
    };

    // Verify the query
    const data: EmailVerifyJwt = jwt.verify(jwtQuery, SECRET) as EmailVerifyJwt;

    let dbData;
    if (data.operation === "resetPassword") {
      // Fetch user info from PasswordReset Table
      const dbRes = (
        await db
          .delete(passwordResetSchema)
          .where(eq(passwordResetSchema.resetToken, jwtQuery))
          .returning()
      )[0];
      dbData = await changePassowrd(data.email, dbRes.newPassword);
    } else if (data.operation === "verifyAccount") {
      dbData = await verifyAccount(data.email);
    }
    // Return both contents combined
    return {
      success: true,
      body: { ...dbData?.body, ...data },
    };
  } catch (e) {
    // Invalid or exipred key
    return {
      success: false,
      body: {
        message: "Error. Invalid or expired link",
      },
    };
  }
};

// SEND VERIFICATION EMAIL
export const verifyMailSender = async (
  email: string,
  operation: string,
  newPassword?: string
) => {
  console.log(email);
  // If email is valid
  if (email !== "") {
    // Create payload with type of operation
    const jwtPayload = {
      email: email,
      operation: operation,
    };

    // Create token valid for 10 minutes
    const jwtToken = jwt.sign(jwtPayload, SECRET, {
      expiresIn: 600,
    });

    let message = "";

    if (operation === "resetPassword") {
      // Insert it into a new database
      await db
        .insert(passwordResetSchema)
        .values({ resetToken: jwtToken, newPassword: newPassword as string });
      message = "Reset your Password";
    } else message = "Verify your Account";

    // Get mail ready
    const transporter: Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_APP_PASS,
      },
    });
    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    // What and who to send
    const mailOptions = {
      from: EMAIL_ACCOUNT,
      to: email,
      subject: "Confirm email for Recipe Recommender App",
      html: `
			Click on the link below to <b>${message}</b> <br>
			https://recipe-recommender-backend.vercel.app/user/auth/verify/${jwtToken}
			`,
    };
    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
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
  return {
    success: true,
    body: {
      message: `Verification code send to ${email}. Valid for 10 minutes`,
    },
  };
};

// Reset Password
export const changePassowrd = async (email: string, newPassword: string) => {
  const hashPassword = await bcrypt.hash(newPassword, 10);

  const userData: UserDataDB = (
    await db
      .update(userSchema)
      .set({ password: hashPassword })
      .where(eq(userSchema.email, email))
  )[0];
  return {
    success: true,
    body: {
      message: `Password successfully changed for ${email}`,
    },
  };
};

export const verifyAccount = async (email: string) => {
  await db
    .update(userSchema)
    .set({ verified: 1 })
    .where(eq(userSchema.email, email));
  return {
    success: true,
    body: {
      message: `Account verified for ${email}`,
    },
  };
};
