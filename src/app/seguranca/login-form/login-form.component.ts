import { StorageService } from './../storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CredenciaisDTO } from './../../../models/credenciais.dto';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { UsuarioDTO } from 'src/models/domain/usuario.dto';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  usuario: UsuarioDTO;

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private user: UsuarioService,
    private storage: StorageService
    ) { }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/centrocustos']);
      },
      error => {
        this.errorHandler.handle(error);
      });
    }
}
