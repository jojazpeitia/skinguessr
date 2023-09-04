import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const skins = await prisma.skins.findMany();
    // console.log(skins);
    
    return NextResponse.json(skins);
}