import { AuthConfig } from "angular-oauth2-oidc"

export const config: {
    oauth: AuthConfig
} = {
    oauth: {
        issuer: "http://localhost:8020/realms/company",
        clientId: "oauth-kck-client",
        scope: "openid profile email offline_access",
        responseType: "code",
        redirectUri: window.location.origin,
    }
}