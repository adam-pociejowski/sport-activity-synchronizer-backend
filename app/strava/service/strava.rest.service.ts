import { StravaOAuthProvider } from "./strava.oauth.provider";
import { RestClientService } from "../../core/service/rest.client.service";
import { OAuthToken } from "../../oauth/model/oauth.token.model";

export abstract class StravaRestService<T> extends RestClientService<T> {
    private oauthProvider = StravaOAuthProvider.getInstance();

    protected constructor() {
        super(process.env.STRAVA_API_URL!!);
    }

    protected getAccessToken = () =>
        this.oauthProvider.getAccessToken()
            .then((token: OAuthToken) => `Bearer ${token.accessToken}`);
}
