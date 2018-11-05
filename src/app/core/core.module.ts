import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { JwtHelper } from 'angular2-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { CentrocustoService } from '../centrocusto/centrocusto.service';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './../seguranca/auth.service';
import { UsuarioService } from '../seguranca/usuario.service';
import { AuthInterceptorProvider } from './../../interceptors/auth.interceptor';
import { StorageService } from './../seguranca/storage.service';

@NgModule({
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastModule,
    MenubarModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    CentrocustoService,
    AuthInterceptorProvider,
    ErrorHandlerService,
    JwtHelper,
    AuthService,
    StorageService,
    UsuarioService
  ]
})
export class CoreModule { }
