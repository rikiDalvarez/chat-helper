import { Request, Response } from "express";
import "dotenv/config";
import qs from "qs"
import config from "../config/config";
import jwt from "jsonwebtoken"

interface GoogleTokenResult {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

async function getGoogleOauthTokens({code}: {code: string}): Promise<GoogleTokenResult> {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: config.GOOGLE_CLIENT_ID,
        client_secret: config.GOOGLE_SECRET_ID,
        redirect_uri: config.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: "authorization_code"
    };
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: qs.stringify(values)
            })
            
            return await res.json()
    } catch (error: any) {
        console.error(error, "failed to fetch google oauth tokens")
        throw new Error(error.message)
    }
}

export async function googleOauthHandler(req: Request, res:Response){
    try {
        const code = req.query.code as string;
        const {id_token, access_token} = await getGoogleOauthTokens({code})
        console.log(id_token, "--",access_token)
        const googleUser = jwt.decode(id_token)
        console.log({googleUser})
        if (!googleUser.email_verified){
            return  res.status(403).send("google account is not verified")
        }
        
    } catch (error) {
        console.error(error, "failed to authorize google user");
        return res.redirect("http://localhost:5173/oauth/error")
    }

}