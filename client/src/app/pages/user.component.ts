import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Item, ItemService } from "../api/services/items.service";
import { catchError, Observable, Subject, takeUntil, tap } from "rxjs";
import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>User</h1>
        @for (item of items | async; track $index) {
            <h2>{{ item.name }}</h2>
        }

        @if (error) {
            <h2>Error: {{error}}</h2>
        }
    `
})
export class UserComponent implements OnInit, OnDestroy {
    readonly itemService = inject(ItemService)

    destroy$ = new Subject<boolean>();
    
    items?: Observable<Item[]>

    error?: string;

    ngOnInit(): void {
        this.items = this.itemService.getItems()
            .pipe(
                takeUntil(this.destroy$),
                catchError((error: HttpErrorResponse) => {
                    this.error = error.error;
                    return []
                })
            )
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}