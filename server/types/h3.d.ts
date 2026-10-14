declare module 'h3' {
    interface H3EventContext {
        user?: JWTUserPayloadType | null;
    }
}

export {};
