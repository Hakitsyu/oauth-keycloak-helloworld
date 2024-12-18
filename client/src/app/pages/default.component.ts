import { HttpBackend, HttpClient } from "@angular/common/http";
import { Component, inject, Injectable, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";

@Component({
    selector: 'app-default',
    standalone: true,
    template: `
        <h1>Default</h1>
    `
})
export class DefaultComponent {
    readonly oauthService = inject(OAuthService);
    readonly router = inject(Router);

    login() {
        this.oauthService.initLoginFlow(this.router.url)
    }
}