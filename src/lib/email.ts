import nodemailer from 'nodemailer';

// Debug log to check environment variables
// function checkEmailConfig() {
//   console.log('Email Config Check:', {
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     user: process.env.SMTP_USER ? 'Exists' : 'Missing',
//     pass: process.env.SMTP_PASSWORD ? 'Exists' : 'Missing',
//     fromEmail: process.env.SMTP_FROM_EMAIL
//   });
// }

// Create transporter
function createTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    throw new Error('SMTP credentials are not configured');
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    debug: true,
    logger: true
  });
}

let transporter: nodemailer.Transporter;

// Initialize transporter
try {
  // checkEmailConfig();
  transporter = createTransporter();
} catch (error) {
  console.error('Failed to create email transporter:', error);
  throw error;
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    if (!transporter) {
      throw new Error('Email transporter not initialized');
    }

    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: {
        name: 'Nova-X',
        address: process.env.SMTP_FROM_EMAIL!
      },
      to: email,
      subject: 'Verify your Nova-X account',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to Nova-X!</h2>
          <p>Thanks for signing up. Please verify your email address to complete your registration.</p>
          <a href="${verificationUrl}" 
             style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
          <p>Or copy and paste this URL into your browser:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  try {
    if (!transporter) {
      throw new Error('Email transporter not initialized');
    }

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/sme/reset-password?token=${token}`;

    const mailOptions = {
      from: {
        name: 'Nova-X',
        address: process.env.SMTP_FROM_EMAIL!
      },
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <a href="${resetUrl}" 
             style="background-color: #4CAF50; color: white; padding: 14px 20px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
          <p>Or copy and paste this URL into your browser:</p>
          <p>${resetUrl}</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
