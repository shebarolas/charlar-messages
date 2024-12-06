import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, name, password } = body;

        if (!email || !name || !password) 
            return new NextResponse("Invalid data", { status: 400 });
        

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        return new NextResponse(
            error.message || "Internal server error",
            { status: 500 }
        );
    }
}