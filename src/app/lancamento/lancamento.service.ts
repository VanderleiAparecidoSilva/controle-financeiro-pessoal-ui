import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { LancamentoDTO } from './../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { api_dominio } from 'src/environments/api.dominio';

export class Filter {
  page = 0;
  linesPerPage = 24;
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

  findAllCredit(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())};
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

  findAllCreditByPeriod(filter: Filter, dateFrom: Date, dateTo: Date): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())
        .set('from', dateFrom.toString())
        .set('to', dateTo.toString())};
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
        .set('linesPerPage', filter.linesPerPage.toString())};
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

  findAllDebitByPeriod(filter: Filter, dateFrom: Date, dateTo: Date): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())
        .set('from', dateFrom.toString())
        .set('to', dateTo.toString())};
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
}
