import { OAuthToken } from "../model/oauth.token.model";
import { OAuthCredentials } from "../model/oauth.credentials.model";
const request = require('request-promise');

export abstract class OAuthProvider {
    protected token: OAuthToken | null = null;

    protected constructor(private readonly oauthUrl: string,
                          private readonly redirectUrl: string,
                          private readonly credentials: OAuthCredentials) {
        if (process.env.MODE === 'prod') {
            this.getAuthorizationCode()
                .then(() => {
                    console.log('authorization code requested');
                });
        }
    }

    public getAccessToken = () =>
        this.shouldRefreshToken(this.token!!) ?
            this.refreshAccessToken() :
            new Promise((resolve: any) => resolve(this.token!!));

    public getAccessTokenFromAuthorizationCode = (authorizationCode: string) => {
        request
            .post(this.oauthUrl+'/token'+
                    '?client_id=50289'+
                    '&client_secret=f5665a278004da7b3f8179b6794a6fcc39a847a2'+
                    '&code='+authorizationCode+
                    '&grant_type=authorization_code', { json: true })
            .then((response: any) => {
                this.token = new OAuthToken(response.access_token, new Date(response.expires_at), response.refresh_token);
            })
            .catch((err: any) => console.log(err));
        }

    private getAuthorizationCode = () =>
        request
            .get(this.oauthUrl+'/authorize'+
                    '?client_id='+this.credentials.clientId+
                    '&response_type=code'+
                    '&redirect_uri='+this.redirectUrl+
                    '&approval_prompt=auto'+
                    '&scope=activity:read_all,activity:read', {})

    private refreshAccessToken = () =>
        request
            .post(this.oauthUrl+'/token'+
                '?client_id='+this.credentials.clientId+
                '&client_secret='+this.credentials.clientSecret+
                '&refresh_token='+this.token?.refreshToken+
                '&grant_type=refresh_token', { json: true })
            .then((response: any) => {
                this.token = new OAuthToken(response.access_token, new Date(response.expires_at), response.refresh_token);
                return this.token;
            })

    private shouldRefreshToken = (token: OAuthToken) =>
        token.accessTokenExpirationDate.getTime() < new Date().getTime() + 1000;
}