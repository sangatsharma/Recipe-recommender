"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2Server = exports.oAuthHandler = void 0;
const config_1 = require("../../../utils/config");
const auth_helpers_1 = require("./auth.helpers");
const oAuthHandler = (_, res) => {
    // Where to redirect to when user picks a account to login with
    // Has to be same as choosen in google cloud console
    const REDIRECT_URI = config_1.ENV === "PROD"
        ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
        : "http://localhost:4000/user/auth/osuccess";
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
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${config_1.GOOGLE_OAUTH_URL}?client_id=${config_1.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    // Redirect to concent page
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
};
exports.oAuthHandler = oAuthHandler;
/*
  After user picks a google account to login and grants required permissions,
  Google redirects to this route with some info in query.
*/
const oAuth2Server = async (req, res, next) => {
    // Get code out of query (Authorization Code)
    // TODO: Maybe, validate state
    const { code } = req.query;
    const REDIRECT_URI = config_1.ENV === "PROD"
        ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
        : "http://localhost:4000/user/auth/osuccess";
    // Ask for Access Token
    const data = {
        code,
        client_id: config_1.GOOGLE_CLIENT_ID,
        client_secret: config_1.GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
    };
    // Exchange authorization code for access token & id_token
    const response = await fetch(config_1.GOOGLE_ACCESS_TOKEN_URL, {
        method: "POST",
        body: JSON.stringify(data),
    });
    const access_token_data = await response.json();
    const { id_token } = access_token_data;
    // verify and extract the information in the id token
    const token_info_response = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
    // TODO: TYPE
    const token_info_response_json = await token_info_response.json();
    const { name, email } = token_info_response_json;
    // Check if user exists or not
    const userTmp = await (0, auth_helpers_1.userExists)(email);
    // If yes, create token and return
    if (userTmp.success) {
        const tokenRes = (0, auth_helpers_1.handleToken)(userTmp.body, res);
        // return res.json(tokenRes);
        res.cookie("XSRF-TOKEN", "Demo123", {
            sameSite: "lax", // lax is important, don't use 'strict' or 'none'
            path: "/",
            secure: true,
            maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
            domain: ".recipe-recommender-backend.vercel.app"
        });
        return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
    }
    // Else register user
    // TODO: ask for username
    else {
        const userData = {
            email: email,
            name: name,
            verified: 1,
        };
        try {
            // Register user
            const registeredUser = await (0, auth_helpers_1.userRegisterHelper)(userData);
            // If user with email already exists
            if (!registeredUser.success) {
                return res.json(registeredUser);
            }
            const registeredUserData = registeredUser.body;
            // Generate Token
            const userToken = (0, auth_helpers_1.handleToken)(registeredUserData, res);
            // return res.json(userToken);
            return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
        }
        catch (err) {
            next(err);
        }
    }
};
exports.oAuth2Server = oAuth2Server;
