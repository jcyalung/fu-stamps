// cookie names
export const COOKIE_NAME = "sb-access-token";
export const REFRESH_NAME = "sb-refresh-token";
export const MAX_AGE = 60*60*24*7; // max age set for 7 days
export const LONG_AGE = 60*60*24*30; // max age for 30 days, refresh token

// table names
export const TABLES = {
    VERIFICATION_CODES: 'verificationcodes',
    USERS: 'users',
    STAMPS: 'stamp',
    STAMPCARDS: 'stampcard',
    REWARDS: 'rewards',
};