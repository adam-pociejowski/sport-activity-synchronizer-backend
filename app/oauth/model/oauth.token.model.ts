export class OAuthToken {
    constructor(public accessToken: string,
                public accessTokenExpirationDate: Date,
                public refreshToken: string) {}
}