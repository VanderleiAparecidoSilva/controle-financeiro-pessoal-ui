import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { API_CONFIG } from './../../config/api.config';
import { StorageService } from './storage.service';
import { UsuarioDTO } from 'src/models/domain/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private storage: StorageService) {}

  findByEmail(email: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/api/usuarios/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${API_CONFIG.bucketBaseUrl}${API_CONFIG.photoPrefix + id}.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }
}
