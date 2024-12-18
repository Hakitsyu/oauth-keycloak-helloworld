import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthService {
    readonly oauthService = inject(OAuthService);
    readonly router = inject(Router);

    login() {
        this.oauthService.initLoginFlow(this.router.url)
    }

    logout() {
        this.oauthService.logOut()
        this.router.navigate(['/']);
    }

    isAuthenticated() {
        return this.oauthService.hasValidAccessToken();
    }
}