import {
  GOOGLE_ACCESS_TOKEN_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_URL,
  ENV,
} from "@/utils/config";
import { NextFunction, Request, Response } from "express";
import { handleToken, userExists, userRegisterHelper } from "./auth.helpers";
import {
  AccessTokenData,
  JsonResponse,
  RegisterForm,
  TokenInfoResponse,
  UserDataDB,
} from "../users.types";

import crypto from "crypto";

const generateState = (referer: string) => {
  const randomString = crypto.randomBytes(8).toString("hex");
  return `${referer}::${randomString}`;
};

export const oAuthHandler = (_: Request, res: Response) => {
  const referer = _.get("Referer") || "https://www.ciy.sangat.tech";
  console.log("referer", referer);

  // Prevent CSRF and more
  const state = generateState(referer);
  res.cookie("oauth_state", state, { httpOnly: true, secure: ENV === "PROD" });

  // Where to redirect to when user picks a account to login with
  // Has to be same as choosen in google cloud console

  // const REDIRECT_URI = ENV === "PROD"
  //   ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
  //   : "http://localhost:4000/user/auth/osuccess";

  const REDIRECT_URI =
    ENV === "PROD"
      ? "https://api.ciy.sangat.tech/user/auth/osuccess"
      : "http://localhost:4000/user/auth/osuccess";

  // Specifies resources our application can access in behalf of resource owner from resource server
  const GOOGLE_OAUTH_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");

  // Generate url from auth request
  // (A pattern, check docs)
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;

  // Redirect to concent page
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
};

/*
  After user picks a google account to login and grants required permissions,
  Google redirects to this route with some info in query.
*/
export const oAuth2Server = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get code out of query (Authorization Code)
  // TODO: Maybe, validate state
  const { code, state } = req.query;

  const storedState = req.cookies.oauth_state;

  if (state !== storedState) {
    return res.status(403).json({ error: "Invalid state parameter" });
  }

  res.clearCookie("oauth_state"); // Remove state cookie
  // Extract the referer from the state
  const referer = decodeURIComponent(state as string).split('::')[0] || "https://www.ciy.sangat.tech";
  console.log("referer", referer);

  // const REDIRECT_URI = ENV === "PROD"
  //   ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
  //   : "http://localhost:4000/user/auth/osuccess";

  const REDIRECT_URI =
    ENV === "PROD"
      ? "https://api.ciy.sangat.tech/user/auth/osuccess"
      : "http://localhost:4000/user/auth/osuccess";

  // Ask for Access Token
  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  // Exchange authorization code for access token & id_token
  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data: AccessTokenData =
    (await response.json()) as AccessTokenData;

  const { id_token } = access_token_data;

  // verify and extract the information in the id token
  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );

  // TODO: TYPE
  const token_info_response_json: TokenInfoResponse =
    (await token_info_response.json()) as TokenInfoResponse;
  const { name, email, picture } = token_info_response_json;

  // Check if user exists or not
  const userTmp = await userExists(email);

  // If yes, create token and return
  if (userTmp.success) {
    const tokenRes: JsonResponse = handleToken(userTmp.body, res);
    // return res.json(tokenRes);

    // return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
    return res.redirect(302, referer as string);
  }

  // Else register user
  // TODO: ask for username
  else {
    const userData = {
      email: email,
      name: name,
      verified: 1,
      profile_pic: picture,
    };

    try {
      // Register user
      const registeredUser = await userRegisterHelper(userData as RegisterForm);

      // If user with email already exists
      if (!registeredUser.success) {
        return res.json(registeredUser);
      }

      const registeredUserData: UserDataDB = registeredUser.body;

      // Generate Token
      const userToken: JsonResponse = handleToken(registeredUserData, res);

      // return res.json(userToken);

      // return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
      return res.redirect(302, referer as string);
    } catch (err) {
      next(err);
    }
  }
};
