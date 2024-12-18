import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar"
import { AuthService } from "../../auth/auth.service";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";

@Component({
    standalone: true,
    selector: 'app-navbar',
    template: `
        <mat-toolbar class="toolbar" color="primary">
            <div class="left">
                <a class="title" (click)="navigateToHome()">OAuth Keycloak HelloWorld</a>
            </div>
            <div class="right">
                @if (this.authService.isAuthenticated()) {
                    <button mat-icon-button [matMenuTriggerFor]="menu">
                        <mat-icon>person</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item (click)="navigateToUser()">Home</button>
                        <button mat-menu-item (click)="this.authService.logout()">Logout</button>
                    </mat-menu>
                } @else {
                    <button mat-stroked-button (click)="this.authService.login()">Login</button>
                }
            </div>
        </mat-toolbar>
    `,
    styles: [
        `
            mat-toolbar {
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                width: 100%;
            }

            .left {
                display: flex;
                align-self: start;
            }

            .right {
                display: flex;
                align-self: end;
            }

            a.title:link {
                text-decoration: inherit;
                color: inherit;
                cursor: auto;
            }

            a.title:visited {
                text-decoration: inherit;
                color: inherit;
                cursor: auto;
            }
        `
    ],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ]
})
export class NavbarComponent {
    readonly authService = inject(AuthService);
    readonly router = inject(Router);

    navigateToHome() {
        this.router.navigate(['/'])
    }
    
    navigateToUser() {
        this.router.navigate(['user']);
    }
}