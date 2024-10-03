import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";

export async function GET() {
  const allMapPosts = await prisma.post.findMany();
  return NextResponse.json(allMapPosts);
}
// req: Request

export async function POST(req: Request) {
    const {} = req.json();
    const post = await prisma.post.create({
        data: {

        }
    });
    return NextResponse.json(post);
  }