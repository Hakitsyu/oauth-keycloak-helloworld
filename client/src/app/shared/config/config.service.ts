import { HttpBackend, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthConfig } from "angular-oauth2-oidc"
import { tap } from "rxjs";

export type Configuration = {
    api: string,
    oauth: AuthConfig
}

@Injectable()
export class ConfigurationService {
  private readonly httpHandler = inject(HttpBackend);
  
  private readonly httpClient = new HttpClient(this.httpHandler);

  private _value?: Configuration;

  get(): Promise<Configuration> {
    return new Promise<Configuration>((resolve, reject) => {
      if (this._value !== undefined)
          return resolve(this._value)

      this.httpClient
        .get<Configuration>('assets/config.json')
        .pipe(tap(config => {
          this._value = config;
          resolve(config)
        }))
        .subscribe();
    })
  }
}
