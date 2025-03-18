import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";
import { oauth } from "../auth/route";

const ZAIM_URL = process.env.ZAIM_URL;
const ZAIM_ACCESS_TOKEN = process.env.ZAIM_ACCESS_TOKEN!;
const ZAIM_ACCESS_SECRET = process.env.ZAIM_ACCESS_SECRET!;

export async function GET() {
  try {
    const request_data = {
      url: ZAIM_URL + "v2/home/money?limit=10&mode=transfer",
      method: "GET",
    };
    const headers = oauth.toHeader(
      oauth.authorize(request_data, {
        key: ZAIM_ACCESS_TOKEN,
        secret: ZAIM_ACCESS_SECRET,
      }),
    );

    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...headers,
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (e) {
    console.error("error", e);
  }
}
