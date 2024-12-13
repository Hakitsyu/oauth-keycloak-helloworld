import { HttpEvent, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, provideHttpClient, withInterceptors } from "@angular/common/http";
import { EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from "@angular/core";
import { OAuthService, provideOAuthClient } from "angular-oauth2-oidc";
import { AuthGuard } from "./auth.guard";
import { Router } from "@angular/router";
import { ConfigurationService } from "../config/config.service";
import { from, map, merge, mergeMap, Observable } from "rxjs";

export function provideAuth(): EnvironmentProviders {
    return makeEnvironmentProviders([
        provideHttpClient(
            withInterceptors([
                authHttpInterceptor
            ]) 
        ),
        provideOAuthClient(),
        provideAppInitializer(async () => {
            const oauthService = inject(OAuthService);
            const router = inject(Router);
            const configurationService = inject(ConfigurationService);

            
            const { oauth: config } = await configurationService.get();

            oauthService.configure({
                ...config,
                redirectUri: window.location.origin,
                requireHttps: false
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

function authHttpInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const oauthService = inject(OAuthService);
    const configurationService = inject(ConfigurationService);

    return from(configurationService.get())
        .pipe(
            mergeMap(config => {
                if (req.url.startsWith(config.api)) {
                    const token = oauthService.getAccessToken()

                    if (token) {
                        req = req.clone({
                            headers: req.headers
                                .append('Authorization', `Bearer ${token}`)
                        });
                    }
                }
            
                return next(req);
            })
        )
}