import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { authInterceptorInterceptor } from './middleware/auth-interceptor.interceptor';
import { environment } from './enviroments/enviroments';
import { CORE_API_URL } from './services/api/core.constants';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzCardModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    SocialLoginModule,
    NzEmptyModule,
    NzTypographyModule,
    IconsProviderModule
  ],
  providers: [IconDirective,IconSetService, { provide: NZ_I18N, useValue: pt_BR },
     provideAnimationsAsync(), provideHttpClient(withInterceptors([authInterceptorInterceptor]))
    , 
    {
      provide: CORE_API_URL,
      useValue: environment.coreApiUrl
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '5118366054-brr6mo7bfp8rhbcjp9js2q88ib99up0r.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
