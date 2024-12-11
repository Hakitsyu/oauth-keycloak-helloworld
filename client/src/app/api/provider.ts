import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders, provideAppInitializer, Provider } from "@angular/core";
import { ItemService } from "./services/items.service";

export function provideApi(): Provider[] {
    return [
        ItemService
    ];
}