import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { ENVIRONMENT } from './../../config/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ENVIRONMENT.tokenWhitelistedDomains,
        blacklistedRoutes: ENVIRONMENT.tokenBlacklistedRoutes
      }
    }),

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent]
})
export class SegurancaModule { }
