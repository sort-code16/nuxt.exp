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

const mocks = vi.hoisted(() => {
    const signedToken = 'test-signed-token';

    return {
        signedToken,
        jwtSecret: 'test-jwt-secret',

        sign: vi.fn(() => signedToken),
        setCookie: vi.fn(),
    };
});

vi.mock('#app/nuxt', () => ({
    useRuntimeConfig: () => ({
        jwtSecret: mocks.jwtSecret,
    }),
}));

vi.mock('jsonwebtoken', () => ({
    default: {
        sign: mocks.sign,
    },
}));

const COOKIE_NAME = 'access_token';

describe('setAuthCookie', () => {
    let auth: typeof import('./auth');

    beforeAll(async () => {
        vi.stubGlobal('setCookie', mocks.setCookie);

        auth = await import('./auth');
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
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
            mocks.jwtSecret,
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
