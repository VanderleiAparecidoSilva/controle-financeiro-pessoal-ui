import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

import { CentrocustoModule } from './centrocusto/centrocusto.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './seguranca/auth-interceptor';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ContabancariaModule } from './contabancaria/contabancaria.module';
import { LancamentoModule } from './lancamento/lancamento.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AngularFontAwesomeModule,

    CoreModule,
    CentrocustoModule,
    ContabancariaModule,
    LancamentoModule,
    SegurancaModule,

    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
