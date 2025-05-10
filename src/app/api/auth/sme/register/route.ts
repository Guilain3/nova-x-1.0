import { prisma } from '@/lib/prisma';
import { hashPassword, generateVerificationToken } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const {
            commencementDate,
            industry,
            contactPhone,
            businessName,
            businessEmail,
            representativeName,
            position,
            representativeEmail,
            representativePhone,
            password,
            acceptTerms,
        } = data;

        if (!acceptTerms) {
            return NextResponse.json(
                { error: 'Terms must be accepted' },
                { status: 400 }
            );
        }

        const existingBusiness = await prisma.user.findFirst({
            where: { email: businessEmail },
        });

        if (existingBusiness) {
            return NextResponse.json(
                { error: 'Business email already registered' },
                { status: 400 }
            );
        }

        const verificationToken = generateVerificationToken();
        const hashedPassword = await hashPassword(password);

        await prisma.$transaction(async (tx) => {
            const industryRecord = await tx.industry.upsert({
                where: { name: industry },
                update: {},
                create: {
                    name: industry,
                    description: `${industry} industry`,
                },
            });

            await tx.user.create({
                data: {
                    email: businessEmail,
                    password: hashedPassword,
                    role: 'SME',
                    status: 'PENDING',
                    verificationToken,
                    smeProfile: {
                        create: {
                            businessName,
                            businessEmail,
                            contactPhone,
                            industry: {
                                connect: { id: industryRecord.id },
                            },
                            commencementDate: new Date(commencementDate),
                            representativeName,
                            position,
                            representativeEmail: representativeEmail || undefined,
                            representativePhone: representativePhone || undefined,
                        },
                    },
                },
            });
        });

        try {
            await sendVerificationEmail(businessEmail, verificationToken);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Registration successful. Please check your email for verification.',
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Failed to create account. Please try again.' },
            { status: 500 }
        );
    }
}
