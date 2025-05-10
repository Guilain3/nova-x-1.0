import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/auth';
import { sendPasswordResetEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // Log the request
        console.log('Received forgot password request for:', email);

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success even if user doesn't exist for security
            console.log('User not found, returning generic response');
            return NextResponse.json({
                message: 'If an account exists, a password reset email will be sent.',
            });
        }

        const resetToken = generateResetToken();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        console.log('Generated reset token for user');

        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        console.log('Updated user with reset token');

        // Send password reset email
        await sendPasswordResetEmail(email, resetToken);

        console.log('Password reset email sent successfully');

        return NextResponse.json({
            message: 'If an account exists, a password reset email will be sent.',
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
