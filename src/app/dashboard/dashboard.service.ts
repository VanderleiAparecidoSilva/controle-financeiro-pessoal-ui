import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment.prod';
import { MoneyHttp } from './../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  lancamentoUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentoUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCentroCusto(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentoUrl}/estatisticas/por-centrocusto`)
    .toPromise();
  }
}
