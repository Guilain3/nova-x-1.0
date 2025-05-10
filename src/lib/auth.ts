import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex');
}
