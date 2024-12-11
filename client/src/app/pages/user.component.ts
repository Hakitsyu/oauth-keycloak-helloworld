import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Item, ItemService } from "../api/services/items.service";
import { Observable, Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule],
    template: `
        <h1>User</h1>
        @for (item of items | async; track $index) {
            <h2>{{ item.name }}</h2>
        }
    `
})
export class UserComponent implements OnInit, OnDestroy {
    readonly itemService = inject(ItemService)

    destroy$ = new Subject<boolean>();
    
    items?: Observable<Item[]>

    ngOnInit(): void {
        this.items = this.itemService.getItems()
            .pipe(takeUntil(this.destroy$))
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}