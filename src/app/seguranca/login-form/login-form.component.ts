import { ErrorHandlerService } from './../../core/error-handler.service';
import { CredenciaisDTO } from './../../../models/credenciais.dto';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate(['/centrocustos']);
      },
      error => {
        this.errorHandler.handle(error);
      });
    }
}
