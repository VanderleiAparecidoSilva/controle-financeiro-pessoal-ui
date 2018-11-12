import { MoneyHttp } from './money-http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UsuarioDTO } from 'src/models/domain/usuario.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: MoneyHttp) {}

  findByEmail(email: string): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${environment.apiUrl}/api/usuarios/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${environment.bucketApiUrl}${environment.photoPrefix + id}.jpg`;
    return this.http.get(url, {responseType : 'blob'});
  }
}
