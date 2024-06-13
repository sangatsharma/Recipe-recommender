import { GOOGLE_ACCESS_TOKEN_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_URL } from "@/utils/config";
import { NextFunction, Request, Response } from "express";
import { handleToken, userExists, userRegisterHelper } from "./auth.helpers";
import { JsonResponse, RegisterForm, UserDataDB } from "../users.types";

export const oAuthHandler = (_: Request, res: Response) => {

  // Where to redirect to when user picks a account to login with
  // Has to be same as choosen in google cloud console
  const REDIRECT_URI = "http://localhost:4000/user/auth/osuccess";

  // Specifies resources our application can access in behalf of resource owner from resource server
  const GOOGLE_OAUTH_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  // Prevent CSRF and more
  const state = "some_state";

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
export const oAuth2Server = async (req: Request, res: Response, next: NextFunction) => {
  // Get code out of query (Authorization Code)
  // TODO: Maybe, validate state
  const { code } = req.query;

  // Ask for Access Token
  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:4000/user/auth/osuccess",
    grant_type: "authorization_code",
  };

  // Exchange authorization code for access token & id_token
  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();

  const { id_token } = access_token_data;

  // verify and extract the information in the id token
  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );
  const token_info_response_json = await token_info_response.json();

  const { name, email } = token_info_response_json;

  // Check if user exists or not
  const userTmp = await userExists(email);

  // If yes, create token and return
  if (userTmp.success) {
    const tokenRes: JsonResponse = handleToken(userTmp.body, res);
    return res.json(tokenRes);
  }

  // Else register user
  // TODO: ask for username
  else {
    const userData = {
      email: email,
      name: name,
    };

    try {
      // Register user
      const registeredUser: UserDataDB = await userRegisterHelper(userData as RegisterForm);

      // Generate Token
      const userToken: JsonResponse = handleToken(registeredUser, res);

      return res.json(userToken);
    }
    catch (err) {
      next(err);
    }
  }
};