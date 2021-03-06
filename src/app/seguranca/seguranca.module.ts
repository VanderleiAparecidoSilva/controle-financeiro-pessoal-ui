import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { JwtModule } from '@auth0/angular-jwt';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const jwtConf: JwtModule = {
  config: {
    tokenGetter: tokenGetter
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    HttpClientModule,

    JwtModule.forRoot(jwtConf),

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
