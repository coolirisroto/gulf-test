
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { BindingKey } from '@loopback/context';
import { HttpClient } from './helpers/HttpClient';
import { StarWarsClient } from './services/SwaAPI';

/* export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace GoogleMybusinessBindings {
  export const GOOGLE_MY_BUSINESS = BindingKey.create<GoogleMyBusiness>(
    'services.mybusiness',
  );

  export const GOOGLE_MY_BUSINESS_SERVICE = BindingKey.create<GoogleMyBusinessService>(
    'services.mybusinessService',
  );
}

export namespace GoogleSheetsBindings {
  export const GOOGLE_SHEETS = BindingKey.create<GoogleSheets>(
    'services.sheets',
  );

  export const GOOGLE_SHEETS_SERVICE = BindingKey.create<GooSheetsService>(
    'services.sheetsService',
  );
} */

export namespace OauthClientBindings {

  export const HTTP_CLIENT = BindingKey.create<HttpClient>(
    'services.httpClient',
  );
}


export namespace StarWarsBindings {
  export const STAR_WARS_CLIENT = BindingKey.create<StarWarsClient>(
    'services.starWars',
  );


}
