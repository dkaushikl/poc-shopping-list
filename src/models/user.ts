export enum AUTH_PROVIDER {
    EMAIL,
    GOOGLE,
    TWITTER
};

export class User {
    uid: string;
    email: string;
    name: string;
    authProvider: AUTH_PROVIDER;
    displayName?: string;
    photoURL?: string;
}
