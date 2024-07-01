import { Request, Response, NextFunction, CookieOptions } from "express";
import { emailVerifyer, handleToken, userRegisterHelper, verifyMailSender } from "./auth.helpers";
import { JsonResponse, LoginForm, RegisterForm, UserDataDB } from "../users.types";
import { userExists } from "./auth.helpers";
import bcrypt from "bcrypt";

export const userRegisterHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Get credentails
  const body: RegisterForm = req.body as RegisterForm;

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
    const userData = await userRegisterHelper(cleanedBody);

    // Generate token
    const userRes: JsonResponse = handleToken(userData.body, res);
    await verifyMailSender(userRes.body.email as string, "verifyAccount");
    return res.json(userRes);
  }
  catch (err) {
    next(err);
  }
};


/*
  LOGIN USER
*/
export const userLoginHandler = async (req: Request, res: Response, next: NextFunction) => {
  const body: LoginForm = req.body as LoginForm;

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
    const userTmp = await userExists(body.email);

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

    const userData: UserDataDB = userTmp.body;

    // Compare to validate password
    const passswordCorrect = await bcrypt.compare(body.password, userData.password as string);

    if (!passswordCorrect) {
      return res.json({
        "success": false,
        "body": {
          "message": "Incorrect password",
        },
      });
    }

    // Generate token, save as cookie
    const userToken: JsonResponse = handleToken(userData, res);
    return res.json(userToken);
  }

  catch (e) {
    next(e);
  }
};


// VERIFICATION EMAILS
export const verifyEmailHandler = async (req: Request, res: Response, _: NextFunction) => {

  // Get token from url param
  const jwtParam = req.params.jwt;

  // Verify email
  const jwtVerify = await emailVerifyer(jwtParam);
  if (!jwtVerify.success) return res.json(jwtVerify);

  return res.render("index", { prop: jwtVerify });
};


/*
  RESET PASSWORD
  USAGE: POST REQ TO /user/auth/password-reset WITH :
    {
      email, newPassword,confirmNewPassword
    }
  Email will be send to provided mail with confirm link.

*/
export const changePasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
  type ResetPassword = {
    email: string,
    newPassword: string,
    confirmNewPassword: string,
  };

  const body: ResetPassword = req.body as ResetPassword;

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

  const userTmp = await userExists(body.email);
  const userData: UserDataDB = userTmp.body;
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
    const verifyResponse = await verifyMailSender(userData.email, "resetPassword", body.newPassword);
    return res.json(verifyResponse);
  }
  catch (err) {
    next(err);
  }

};


/*
  LOG USER OUT
  WARNING: THIS DOSEN'T INVALIDATE THE TOKEN
*/
export const logoutHandler = (req: Request, res: Response, _: NextFunction) => {
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
