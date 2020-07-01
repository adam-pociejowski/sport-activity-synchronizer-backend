import { OAuthCredentials } from "../../oauth/model/oauth.credentials.model";
import { OAuthProvider } from "../../oauth/service/oauth.provider";

export class StravaOAuthProvider extends OAuthProvider {
    private static readonly instance = new StravaOAuthProvider();

     constructor() {
        super(
            process.env.STRAVA_API_URL!!+'/oauth',
            process.env.STRAVA_OAUTH_REDIRECT_URL!!,
            new OAuthCredentials(
                process.env.STRAVA_API_OAUTH_CLIENT_ID!!,
                process.env.STRAVA_API_OAUTH_CLIENT_SECRET!!
            )
        )
    }

    public static getInstance = () => StravaOAuthProvider.instance;
}