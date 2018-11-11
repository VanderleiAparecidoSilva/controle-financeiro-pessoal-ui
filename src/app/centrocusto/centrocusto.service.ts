import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { API_CONFIG } from './../../config/api.config';
import { CentroCustoDTO } from 'src/models/domain/centrocusto.dto';
import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from './../seguranca/auth.service';

export class Filter {
  page = 0;
  linesPerPage = 8;
}

@Injectable({
  providedIn: 'root'
})
export class CentrocustoService {

  constructor(
    private httpClient: MoneyHttp,
    private auth: AuthService
  ) { }

  findAll(filter: Filter): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())};
    return this.httpClient.get<any>(`${API_CONFIG.baseUrl}/api/centrocustos`, httpOptions)
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

  findByName(filter: Filter, nome: string, ativo: string): Promise<any> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())
        .set('nome', nome)
        .set('ativo', ativo)};
    return this.httpClient.get<any>(`${API_CONFIG.baseUrl}/api/centrocustos/email/nome`, httpOptions)
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

  findById(id: string): Promise<CentroCustoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
    };

    return this.httpClient.get<CentroCustoDTO>(
      `${API_CONFIG.baseUrl}/api/centrocustos/${this.auth.jwtPayload.user_name}/${id}`, httpOptions)
      .toPromise()
      .then( response => {
        return response;
      });
  }

  save(obj: CentroCustoDTO): Promise<CentroCustoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.post<CentroCustoDTO>(`${API_CONFIG.baseUrl}/api/centrocustos`,
      JSON.stringify(obj), httpOptions)
      .toPromise()
      .then(response => response);
  }

  update(obj: CentroCustoDTO): Promise<CentroCustoDTO> {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
        .set('Content-Type', 'application/json')
    };
    return this.httpClient.put<CentroCustoDTO>(
      `${API_CONFIG.baseUrl}/api/centrocustos/${this.auth.jwtPayload.user_name}/${obj.id}`,
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
    return this.httpClient.post<void>(`${API_CONFIG.baseUrl}/api/centrocustos/upload`,
      obj, httpOptions)
      .toPromise()
      .then(() => null);
  }

  enableById(id: string): Promise<void> {
    return this.httpClient.put<void>(
      `${API_CONFIG.baseUrl}/api/centrocustos/ativar/${id}/${this.auth.jwtPayload.user_name}`, null)
      .toPromise();
  }

  disableById(id: string): Promise<void> {
    return this.httpClient.put<void>(
      `${API_CONFIG.baseUrl}/api/centrocustos/desativar/${id}/${this.auth.jwtPayload.user_name}`, null)
      .toPromise();
  }
}
