import { Injectable } from "@angular/core";
import { AuthConfig } from "angular-oauth2-oidc"

export type Configuration = {
    api: string,
    oauth: AuthConfig
}

@Injectable()
export class ConfigurationService {
    private _value?: Configuration;

    get(): Promise<Configuration> {
      return new Promise<Configuration>((resolve, reject) => {
        if (this._value !== undefined)
            return resolve(this._value)

        import('@project/config').then(({ config }) => {
            this._value = config;
            resolve(config);
        });
      })
    }
}
