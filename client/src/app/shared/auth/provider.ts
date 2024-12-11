import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { OAuthService, provideOAuthClient } from "angular-oauth2-oidc";
import { AuthGuard } from "./auth.guard";
import { Router } from "@angular/router";
import { ConfigurationService } from "../config/config.service";

export function provideAuth(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideHttpClient(),
        provideOAuthClient(),
        provideAppInitializer(async () => {
            const oauthService = inject(OAuthService);
            const router = inject(Router);
            const configurationService = inject(ConfigurationService);

            const { oauth: config } = await configurationService.get();

            oauthService.configure({
                ...config,
                redirectUri: window.location.origin
            });

            await oauthService.loadDiscoveryDocumentAndTryLogin()
                .then(async () => {
                    const url = oauthService.state;
                    if (!!url)
                        await router.navigateByUrl(decodeURIComponent(url))
                })
        }),
        AuthGuard
    ]);
}