import { Injectable } from "@angular/core";
import { ApiService } from "./base";
import { Observable } from "rxjs";

export interface Item {
    name: string
}

@Injectable()
export class ItemService extends ApiService {
    getItems(): Observable<Item[]> {
        return this.get('item');
    }   
}