import { OAuthCredentials } from "../../oauth/model/oauth.credentials.model";
import { OAuthProvider } from "../../oauth/service/oauth.provider";
import { OAuthToken } from "../../oauth/model/oauth.token.model";

export class StravaOAuthProvider extends OAuthProvider {
    private static readonly instance = new StravaOAuthProvider();

     constructor() {
        super(
            process.env.STRAVA_API_URL!!+'/oauth',
            process.env.STRAVA_OAUTH_REDIRECT_URL!!,
            new OAuthCredentials(
                process.env.STRAVA_OAUTH_CLIENT_ID!!,
                process.env.STRAVA_OAUTH_CLIENT_SECRET!!
            )
        )
        this.token = new OAuthToken('', new Date(), process.env.STRAVA_OAUTH_REFRESH_TOKEN!!);
        this.refreshAccessToken()
            .then(() => console.log('Access token retrieved'))
            .catch((err: any) => console.log('Problem while getting access token', err));
    }

    public static getInstance = () => StravaOAuthProvider.instance;
}