import { hashSync, compareSync } from 'bcrypt-ts';

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
