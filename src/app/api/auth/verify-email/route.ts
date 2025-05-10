import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { error: 'Verification token is required' },
                { status: 400 }
            );
        }

        // Find user with this verification token
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token,
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid verification token' },
                { status: 400 }
            );
        }

        // Update user verification status
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                verificationToken: null,
                status: 'ACTIVE',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify email' },
            { status: 500 }
        );
    }
}
