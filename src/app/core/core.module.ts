import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import {FileUploadModule} from 'primeng/fileupload';
import { JwtHelperService } from '@auth0/angular-jwt';

import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { CentrocustoService } from '../centrocusto/centrocusto.service';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './../seguranca/auth.service';
import { UsuarioService } from '../seguranca/usuario.service';
import { MoneyHttp } from '../seguranca/money-http';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,

    ConfirmDialogModule,
    ToastModule,
    MenubarModule,
    FileUploadModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule,
    FileUploadModule
  ],
  providers: [
    MoneyHttp,
    CentrocustoService,
    ErrorHandlerService,
    JwtHelperService,
    AuthService,
    UsuarioService,

    ConfirmationService,
    MessageService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
