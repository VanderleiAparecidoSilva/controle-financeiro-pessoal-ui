import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment.prod';
import { MoneyHttp } from './../seguranca/money-http';
import { api_dominio } from 'src/environments/api.dominio';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: MoneyHttp) {
  }

  lancamentosPorCentroCusto(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${environment.apiUrl}${api_dominio.lancamento}/estatisticas/por-centrocusto`)
    .toPromise();
  }
}
