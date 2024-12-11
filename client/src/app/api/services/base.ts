import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { ConfigurationService } from "@project/app/shared/config/config.service"
import { from, map, mergeMap } from "rxjs"

export abstract class ApiService {
    private readonly configurationService = inject(ConfigurationService)
    
    protected readonly httpClient = inject(HttpClient)

    protected get<T>(path: string) {
        return from(this.configurationService.get())
            .pipe(
                mergeMap(config => this.httpClient.get<T>(`${config.api}/${path}`))
            )
    }
}