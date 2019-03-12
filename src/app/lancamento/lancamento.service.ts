import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { LancamentoDTO } from './../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { api_dominio } from 'src/environments/api.dominio';

export class Filter {
  page = 0;
  linesPerPage = 24;
  dtInicial = new Date();
  dtFinal = new Date();
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
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('id', id)
    };

    return this.httpClient.get<LancamentoDTO>(
      `${environment.apiUrl}${api_dominio.lancamento}/email/id`, httpOptions)
      .toPromise()
      .then( response => {
        return response;
      });
  }

  findAllCredit(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', '500')};
    return this.httpClient.get<any>(`${environment.apiUrl}${api_dominio.lancamento}/credito`, httpOptions)
      .toPromise()
      .then( response => {
        const obj = response.content;

        const result = {
          obj,
          totalElements: response.totalElements
        };

        return result;
      });
  }

  findAllCreditByPeriod(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', '500')
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('description', filter.descricaoLancamento)
        .set('onlyOpen', filter.somenteTitulosAbertos)};
    return this.httpClient.get<any>(`${environment.apiUrl}${api_dominio.lancamento}/credito/periodo`, httpOptions)
      .toPromise()
      .then( response => {
        const obj = response.content;

        const result = {
          obj,
          totalElements: response.totalElements
        };

        return result;
      });
  }

  findAllDebit(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', '500')};
    return this.httpClient.get<any>(`${environment.apiUrl}${api_dominio.lancamento}/debito`, httpOptions)
      .toPromise()
      .then( response => {
        const obj = response.content;

        const result = {
          obj,
          totalElements: response.totalElements
        };

        return result;
      });
  }

  findAllDebitByPeriod(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', '500')
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('description', filter.descricaoLancamento)
        .set('onlyOpen', filter.somenteTitulosAbertos)};
    return this.httpClient.get<any>(`${environment.apiUrl}${api_dominio.lancamento}/debito/periodo`, httpOptions)
      .toPromise()
      .then( response => {
        const obj = response.content;

        const result = {
          obj,
          totalElements: response.totalElements
        };

        return result;
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

  upload(obj: string): Promise<void> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name),
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post<void>(`${environment.apiUrl}${api_dominio.lancamento}/upload`,
      obj, httpOptions)
      .toPromise()
      .then(() => null);
  }

  disable(obj: string): Promise<void> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.put<void>(
      `${environment.apiUrl}${api_dominio.lancamento}/desativar/${obj}`,
      JSON.stringify(obj), httpOptions)
      .toPromise()
      .then(response => response);
  }
}
