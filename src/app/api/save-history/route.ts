import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await fetch("https://api.zaim.net/v2/home/money");
  }
}