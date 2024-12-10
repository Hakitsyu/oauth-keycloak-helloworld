import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly oauthService: OAuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (this.oauthService.hasValidAccessToken()) {
            return true;
        } else {
            this.oauthService.initLoginFlow(state.url);
            return false;
        }
    }
}