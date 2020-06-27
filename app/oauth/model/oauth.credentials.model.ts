export class OAuthCredentials {
    constructor(public clientId: string,
                public clientSecret: string,
                public grantType: string) {}
}