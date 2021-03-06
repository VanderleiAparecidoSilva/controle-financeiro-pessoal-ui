import { CentroCustoDTO } from './../../models/domain/centrocusto.dto';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { api_dominio } from 'src/environments/api.dominio';
import { MoneyHttp } from './../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';
import { stringify } from '@angular/core/src/render3/util';

export class Filter {
  dtInicial = new Date();
  dtFinal = new Date();
  centroCustoPrimario: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: MoneyHttp,
    private auth: AuthService) {
  }

  lancamentosCreditoPorCentroCustoSintetico(filter: Filter): Promise<Array<any>> {
    if ((filter.centroCustoPrimario === null) || (filter.centroCustoPrimario === '')) {
      filter.centroCustoPrimario = null;
    }
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('costCenter', JSON.stringify(filter.centroCustoPrimario))};

    return this.http.get<Array<any>>(`${environment.apiUrl}${api_dominio.lancamento}/estatisticas/credito/por-centrocusto-sintetico`, httpOptions)
    .toPromise();
  }

  lancamentosDebitoPorCentroCustoSintetico(filter: Filter): Promise<Array<any>> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('costCenter', JSON.stringify(filter.centroCustoPrimario))};

    return this.http.get<Array<any>>(`${environment.apiUrl}${api_dominio.lancamento}/estatisticas/debito/por-centrocusto-sintetico`, httpOptions)
    .toPromise();
  }

  lancamentosCreditoPorCentroCustoAnalitico(filter: Filter): Promise<Array<any>> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('costCenter', JSON.stringify(filter.centroCustoPrimario))};

    return this.http.get<Array<any>>(`${environment.apiUrl}${api_dominio.lancamento}/estatisticas/credito/por-centrocusto-analitico`, httpOptions)
    .toPromise();
  }

  lancamentosDebitoPorCentroCustoAnalitico(filter: Filter): Promise<Array<any>> {
    const httpOptions = {
      params: new HttpParams()
        .set('email', this.auth.jwtPayload.user_name)
        .set('from', moment(filter.dtInicial).format('YYYY-MM-DD'))
        .set('to', moment(filter.dtFinal).format('YYYY-MM-DD'))
        .set('costCenter', JSON.stringify(filter.centroCustoPrimario))};

    return this.http.get<Array<any>>(`${environment.apiUrl}${api_dominio.lancamento}/estatisticas/debito/por-centrocusto-analitico`, httpOptions)
    .toPromise();
  }
}
