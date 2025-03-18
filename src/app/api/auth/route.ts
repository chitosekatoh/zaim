import { NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const REQUEST_TOKEN_URL = process.env.ZAIM_REQUEST_TOKEN_URL!;
const AUTH_URL = process.env.ZAIM_AUTH_URL!;
const CONSUMER_KEY = process.env.ZAIM_CONSUMER_KEY!;
const CONSUMER_SECRET = process.env.ZAIM_CONSUMER_SECRET!;
const CALLBACK_URL = process.env.ZAIM_CALLBACK_URL;

export const oauth = new OAuth({
  consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export async function GET() {
  const request_data = {
    url: REQUEST_TOKEN_URL,
    method: "POST",
    data: { callback: CALLBACK_URL },
  };

  const headers = oauth.toHeader(oauth.authorize(request_data));

  try {
    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const params = new URLSearchParams(await response.text());
    const oauth_token = params.get("oauth_token");

    if (!oauth_token) {
      return NextResponse.json(
        { error: "oauth_token が取得できませんでした。" },
        { status: 500 },
      );
    }

    return NextResponse.redirect(AUTH_URL + "?oauth_token" + oauth_token);
  } catch (e) {
    return NextResponse.json(
      { error: "OAuth の呼び出しに失敗しました。" },
      { status: 500 },
    );
  }
}
