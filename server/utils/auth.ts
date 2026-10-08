import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt-ts';
import type { H3Event } from 'h3';

const TOKEN_SECRET = process.env.JWT_SECRET!;
const TOKEN_COOKIE_NAME = 'auth_token';

export function hashPassword(password: string): string {
    return hashSync(password, 8);
};

export function verifyPassword(password: string, hash: string): boolean {
    try {
        return compareSync(password, hash);
    } catch (e) {
        console.log('Error while verifying user password', e);

        return false;
    }
};

export function setAuthCookie(event: H3Event, user: SafeUserDatabaseType) {
    const token = jwt.sign(user, TOKEN_SECRET, { expiresIn: '7d' });

    setCookie(event, TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: !import.meta.dev,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
};

export function clearAuthCookie(event: H3Event) {
    deleteCookie(event, TOKEN_COOKIE_NAME);
};

export function getUserFromAuthCookie(event: H3Event) {
    const token = getCookie(event, TOKEN_COOKIE_NAME);

    if (!token) return null;

    try {
        return jwt.verify(token, TOKEN_SECRET) as jwt.JwtPayload & SafeUserDatabaseType;
    } catch {
        clearAuthCookie(event);

        return null;
    }
};
