// @vitest-environment node
import {
    vi,
    describe,
    beforeAll,
    beforeEach,
    afterAll,
    it,
    expect,
} from 'vitest';

import type { H3Event } from 'h3';

const TEST_JWT_SECRET = 'test-jwt-secret';
const COOKIE_NAME = 'access_token';

const mocks = vi.hoisted(() => {
    const signedToken = 'test-signed-token';

    return {
        signedToken,
        sign: vi.fn(() => signedToken),
        setCookie: vi.fn(),
    };
});

vi.mock('jsonwebtoken', () => ({
    default: {
        sign: mocks.sign,
    },
}));

describe('setAuthCookie', () => {
    let auth: typeof import('./auth');

    beforeAll(async () => {
        vi.stubEnv('JWT_SECRET', TEST_JWT_SECRET);
        vi.stubGlobal('setCookie', mocks.setCookie); // stub Nuxt's auto-import so the cookie options can be checked

        auth = await import('./auth');
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it('creates an auth token and sets it to a cookie with correct params', () => {
        const event = {} as H3Event;

        const user = {
            id: 42,
            email: 'user@example.com',
            username: 'user',
        };

        auth.setAuthCookie(event, user);

        expect(mocks.sign).toHaveBeenCalledWith(
            user,
            TEST_JWT_SECRET,
            { expiresIn: '7d' },
        );

        expect(mocks.setCookie).toHaveBeenCalledWith(
            event,
            COOKIE_NAME,
            mocks.signedToken,
            {
                httpOnly: true,
                secure: !import.meta.dev, // expect.any(Boolean)
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            },
        );
    });
});
