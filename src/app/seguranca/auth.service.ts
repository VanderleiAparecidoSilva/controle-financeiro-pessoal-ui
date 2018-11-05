import { StorageService } from './storage.service';
import { LocalUserDTO } from './../../models/localuser.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelper } from 'angular2-jwt';

import { API_CONFIG } from 'src/config/api.config';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { UsuarioDTO } from './../../models/domain/usuario.dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'https://controle-financeiro-pessoal.herokuapp.com/login';

  user: LocalUserDTO = {
    token: '',
    email: ''
  };

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper,
    private storage: StorageService
    ) { }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: 'response',
        responseType: 'text'
      });
  }

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    this.user.token = tok;
    this.user.email = this.jwtHelper.decodeToken(tok).sub;

    this.storage.setLocalUser(this.user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
