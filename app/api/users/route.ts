import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ success: true, message: 'User route is working!' }); 
}
// Dummy user data
