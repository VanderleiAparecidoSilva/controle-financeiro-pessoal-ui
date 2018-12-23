import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { LancamentoDTO } from './../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { api_dominio } from 'src/environments/api.dominio';

export class Filter {
  page = 0;
  linesPerPage = 20;
  dtInicial = null;
  dtFinal = null;
  descricaoLancamento: string;
  somenteTitulosAbertos = 'Sim';
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(
    private httpClient: MoneyHttp,
    private auth: AuthService
  ) { }

  findById(id: string): Promise<LancamentoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    };

    return this.httpClient.get<LancamentoDTO>(
      `${environment.apiUrl}${api_dominio.lancamento}/${this.auth.jwtPayload.user_name}/${id}`, httpOptions)
      .toPromise()
      .then( response => {
        return response;
      });
  }

  save(obj: LancamentoDTO): Promise<LancamentoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post<LancamentoDTO>(`${environment.apiUrl}${api_dominio.lancamento}`,
      JSON.stringify(obj), httpOptions)
      .toPromise()
      .then(response => response);
  }

  update(obj: LancamentoDTO): Promise<LancamentoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.put<LancamentoDTO>(
      `${environment.apiUrl}${api_dominio.lancamento}/${this.auth.jwtPayload.user_name}/${obj.id}`,
      JSON.stringify(obj), httpOptions)
      .toPromise()
      .then(response => response);
  }
}
