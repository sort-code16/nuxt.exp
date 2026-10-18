import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';

export type JWTUserPayloadType = jwt.JwtPayload & SafeUserDatabaseType;

const TOKEN_SECRET = process.env.JWT_SECRET!;
const TOKEN_COOKIE_NAME = 'auth_token';

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
        return jwt.verify(token, TOKEN_SECRET) as JWTUserPayloadType;
    } catch {
        clearAuthCookie(event);

        return null;
    }
};
