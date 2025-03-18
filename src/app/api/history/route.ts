import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const history = await prisma.history.findMany();
    return NextResponse.json(history);
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
