import { NextRequest, NextResponse } from 'next/server';
import {fetchUserByExactName} from "@/app/lib/data";

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();
        const users = await fetchUserByExactName(name);
        if (users.length === 0) {
            return NextResponse.json({ exists: false });
        } else if (users.length === 1) {
            return NextResponse.json({ exists: true });
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}