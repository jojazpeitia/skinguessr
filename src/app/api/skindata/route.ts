import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    const skins = await prisma.skins.findMany();
    // console.log(skins);

    // Map over skins to convert BigInt fields (id) to strings
    const processedSkins = skins.map(skin => {
        return {
            ...skin,
            id: skin.id.toString()  // Convert BigInt id to string
        };
    });
    return NextResponse.json(processedSkins);
}