import { Injectable } from '@angular/core';

import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { API_CONFIG } from './../../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: MoneyHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${API_CONFIG.baseUrl}/api/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
