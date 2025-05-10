import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        smeProfile: true,
      },
    });

    if (!user || user.role !== 'SME') {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in' },
        { status: 403 }
      );
    }

    // Check if account is active
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      );
    }

    // TODO: Generate session/JWT token
    // const token = generateToken(user);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        businessName: user.smeProfile?.businessName,
      },
      // token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
