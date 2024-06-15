import { Request, Response, NextFunction } from "express";
import { handleToken, userRegisterHelper } from "./auth.helpers";
import { JsonResponse, LoginForm, RegisterForm, UserDataDB } from "../users.types";
import { userExists } from "./auth.helpers";
import bcrypt from "bcrypt";

export const userRegisterHandler = async (req: Request, res: Response, next: NextFunction) => {

  // Get credentails
  const body: RegisterForm = req.body as RegisterForm;

  // Email and Password are required
  //TODO: Check for all required fields
  if (!body.email || !body.password || !body.name) {
    return res.json({
      "success": false,
      "body": {
        "message": "Empty fields",
      },
    });
  }
  try {
    // Register user
    const userData: UserDataDB = await userRegisterHelper(body);

    // Generate token
    const userRes: JsonResponse = handleToken(userData, res);
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
  if (!body.email || !body.password) {
    return res.json({
      "success": false,
      "body": {
        "message": "All fields are required",
      },
    });
  }

  try {

    // Check if user exists or not
    // const userTmp = (await db.select().from(userSchema).where(eq(userSchema.email, body.email)));
    const userTmp = await userExists(body.email);
    if (!userTmp.success) {
      return res.json({
        "success": false,
        "body": {
          "message": "User with this email dosen't exist",
        },
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