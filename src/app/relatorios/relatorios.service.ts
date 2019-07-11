import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { AuthService } from './../seguranca/auth.service';
import { MoneyHttp } from './../seguranca/money-http';
import { environment } from 'src/environments/environment';
import { api_dominio } from './../../environments/api.dominio';

export class Filter {
  page = 0;
  linesPerPage = 24;
  dtInicial = new Date();
  dtFinal = new Date();
  descricaoLancamento: string;
  somenteTitulosAbertos = 'Sim';
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  constructor(
    private httpClient: MoneyHttp,
    private auth: AuthService
  ) {}

  centroCustoReport(tipo: string): Promise<Blob> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('tipo', tipo),
      responseType: 'blob'
    };
    return this.httpClient.get<Blob>(`${environment.apiUrl}${api_dominio.centroCusto}/relatorio/tipo`, httpOptions)
      .toPromise()
      .then(response => response);
  }

  contaBancariaReport(): Promise<Blob> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name),
      responseType: 'blob'
    };
    return this.httpClient.get<Blob>(`${environment.apiUrl}${api_dominio.contaBancaria}/relatorio`, httpOptions)
      .toPromise()
      .then(response => response);
  }

  lancamentoReport(filter: Filter): Promise<Blob> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', '500')
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('description', filter.descricaoLancamento)
        .set('onlyOpen', filter.somenteTitulosAbertos)
        .set('type', filter.type),
      responseType: 'blob'
    };

    return this.httpClient.get<Blob>(`${environment.apiUrl}${api_dominio.lancamento}/relatorio/lancamento`, httpOptions)
    .toPromise()
    .then(response => response);
  }
}
