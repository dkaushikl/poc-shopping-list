export enum AUTH_PROVIDER {
    EMAIL,
    GOOGLE
};

export class User {
    userId: string;
    email: string;
    name: string;
    authProvider: AUTH_PROVIDER;
    picture: string;
}
