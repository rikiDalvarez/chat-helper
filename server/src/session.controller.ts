import { Request, Response } from "express";
import "dotenv/config";
import qs from "qs"
import config from "../config/config";

async function getGoogleOauthTokens({code}: {code: string}){
    const url = "http://oauth2/googleapis.com/token";
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
            return res
    } catch (error: any) {
        console.error(error, "failed to fetch google oauth tokens")
        throw new Error(error.message)
    }
return {code: "a"}
}

export async function googleOauthHandler(req: Request, res:Response){
    const code = req.query.code as string;
    const {id_token, access_token} = await getGoogleOauthTokens({code})

   
}