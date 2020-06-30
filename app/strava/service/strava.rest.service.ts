import { OAuthRestService } from "../../oauth/service/oauth.rest.service";
import { OAuthCredentials } from "../../oauth/model/oauth.credentials.model";

export abstract class StravaRestService<T> extends OAuthRestService<T> {

    protected constructor() {
        super(process.env.STRAVA_API_URL!!,
            new OAuthCredentials(
                process.env.STRAVA_API_OAUTH_CLIENT_ID!!,
                process.env.STRAVA_API_OAUTH_CLIENT_SECRET!!,
                process.env.STRAVA_API_OAUTH_GRANT_TYPE!!
            )
        );
    }
}
