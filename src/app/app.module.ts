import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TabelaPacienteComponent } from './tabela-paciente/tabela-paciente.component';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_BR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';

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
    FormsModule,
    IconsProviderModule
  ],
  providers: [IconDirective,IconSetService, { provide: NZ_I18N, useValue: pt_BR }, provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
