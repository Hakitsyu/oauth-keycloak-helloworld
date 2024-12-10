import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { OAuthService, provideOAuthClient } from "angular-oauth2-oidc";
import { AuthGuard } from "./auth.guard";
import { Router } from "@angular/router";

export function provideAuth(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideHttpClient(),
        provideOAuthClient(),
        provideAppInitializer(() => {
            const oauthService = inject(OAuthService);
            const router = inject(Router);

            return import('@project/config')
                .then(m => m.config.oauth)
                .then(c => {
                    console.log(c)
                    oauthService.configure(c);
                    oauthService.loadDiscoveryDocumentAndTryLogin()
                        .then(async () => {
                            const url = oauthService.state;
                            if (!!url)
                                await router.navigateByUrl(decodeURIComponent(url))
                        })
                })
        }),
        AuthGuard
    ]);
}