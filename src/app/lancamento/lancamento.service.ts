import { Injectable } from '@angular/core';

import { MoneyHttp } from '../seguranca/money-http';
import { AuthService } from '../seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(
    private httpClient: MoneyHttp,
    private auth: AuthService
  ) { }
}
