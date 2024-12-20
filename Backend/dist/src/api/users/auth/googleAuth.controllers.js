"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2Server = exports.oAuthHandler = void 0;
const config_1 = require("../../../utils/config");
const auth_helpers_1 = require("./auth.helpers");
const crypto_1 = __importDefault(require("crypto"));
const generateState = (referer) => {
    const randomString = crypto_1.default.randomBytes(8).toString("hex");
    return `${referer}::${randomString}`;
};
const oAuthHandler = (_, res) => {
    const referer = _.get("Referer") || "https://www.ciy.sangat.tech";
    console.log("referer", referer);
    // Prevent CSRF and more
    const state = generateState(referer);
    res.cookie("oauth_state", state, { httpOnly: true, secure: config_1.ENV === "PROD" });
    // Where to redirect to when user picks a account to login with
    // Has to be same as choosen in google cloud console
    // const REDIRECT_URI = ENV === "PROD"
    //   ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
    //   : "http://localhost:4000/user/auth/osuccess";
    const REDIRECT_URI = config_1.ENV === "PROD"
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
    const { code, state } = req.query;
    const storedState = req.cookies.oauth_state;
    if (state !== storedState) {
        return res.status(403).json({ error: "Invalid state parameter" });
    }
    res.clearCookie("oauth_state"); // Remove state cookie
    // Extract the referer from the state
    const referer = decodeURIComponent(state).split('::')[0] || "https://www.ciy.sangat.tech";
    console.log("referer", referer);
    // const REDIRECT_URI = ENV === "PROD"
    //   ? "https://recipe-recommender-backend.vercel.app/user/auth/osuccess"
    //   : "http://localhost:4000/user/auth/osuccess";
    const REDIRECT_URI = config_1.ENV === "PROD"
        ? "https://api.ciy.sangat.tech/user/auth/osuccess"
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
    const access_token_data = (await response.json());
    const { id_token } = access_token_data;
    // verify and extract the information in the id token
    const token_info_response = await fetch(`${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
    // TODO: TYPE
    const token_info_response_json = (await token_info_response.json());
    const { name, email, picture } = token_info_response_json;
    // Check if user exists or not
    const userTmp = await (0, auth_helpers_1.userExists)(email);
    // If yes, create token and return
    if (userTmp.success) {
        const tokenRes = (0, auth_helpers_1.handleToken)(userTmp.body, res);
        // return res.json(tokenRes);
        // return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
        return res.redirect(302, referer);
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
            const registeredUser = await (0, auth_helpers_1.userRegisterHelper)(userData);
            // If user with email already exists
            if (!registeredUser.success) {
                return res.json(registeredUser);
            }
            const registeredUserData = registeredUser.body;
            // Generate Token
            const userToken = (0, auth_helpers_1.handleToken)(registeredUserData, res);
            // return res.json(userToken);
            // return res.redirect(302, "https://recipe-recommender-five.vercel.app/");
            return res.redirect(302, referer);
        }
        catch (err) {
            next(err);
        }
    }
};
exports.oAuth2Server = oAuth2Server;
