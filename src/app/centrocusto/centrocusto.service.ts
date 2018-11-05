import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_CONFIG } from './../../config/api.config';
import { CentroCustoDTO } from 'src/models/domain/centrocusto.dto';

export class Filter {
  page = 0;
  linesPerPage = 9;
}

@Injectable({
  providedIn: 'root'
})
export class CentrocustoService {

  constructor(private httpClient: HttpClient) { }

  findAll(filter: Filter): Observable<CentroCustoDTO[]> {
    const httpOptions = {
      params: new HttpParams()
        .set('page', filter.page.toString())
        .set('linesPerPage', filter.linesPerPage.toString())};
    return this.httpClient.get<CentroCustoDTO[]>(`${API_CONFIG.baseUrl}/api/centrocustos`, httpOptions);
  }

  enableById(id: string): Observable<void> {
    return this.httpClient.put<void>(`${API_CONFIG.baseUrl}/api/centrocustos/ativar/${id}`, null);
  }

  disableById(id: string): Observable<void> {
    return this.httpClient.put<void>(`${API_CONFIG.baseUrl}/api/centrocustos/desativar/${id}`, null);
  }
}
