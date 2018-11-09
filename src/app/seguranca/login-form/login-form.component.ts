import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UsuarioDTO } from 'src/models/domain/usuario.dto';
import { CredenciaisDTO } from './../../../models/credenciais.dto';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  creds: CredenciaisDTO = {
    username: '',
    password: '',
    granttype: 'password'
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
      .then(() => {
        this.router.navigate(['/centrocusto']);
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }
}
