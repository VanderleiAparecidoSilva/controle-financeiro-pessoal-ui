import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { UploadBankDTO } from 'src/models/domain/upload-bank.dto';
import { environment } from 'src/environments/environment';
import { api_dominio } from 'src/environments/api.dominio';

@Injectable({
  providedIn: 'root'
})
export class UploadBankService {
  constructor(
    private httpClient: MoneyHttp,
    private auth: AuthService
  ) { }

  findById(id: string): Promise<UploadBankDTO> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('id', id)
    };

    return this.httpClient.get<UploadBankDTO>(
      `${environment.apiUrl}${api_dominio.uploadBank}/email/id`, httpOptions)
      .toPromise()
      .then( response => {
        return response;
      });
  }
}
