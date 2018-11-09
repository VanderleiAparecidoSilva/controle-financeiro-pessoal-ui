import { MoneyHttp } from './money-http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API_CONFIG } from './../../config/api.config';
import { UsuarioDTO } from 'src/models/domain/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: MoneyHttp) {}

  findByEmail(email: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/api/usuarios/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}${API_CONFIG.photoPrefix + id}.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }
}
