import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotAuthenticatedError } from './../seguranca/money-http';
import { MessageService } from 'primeng/components/common/messageservice';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let viewMessage = false;
    let messageSummary: string;
    let messageDetail: string;

    messageSummary = 'Erro';
    if (typeof errorResponse === 'string') {
      viewMessage = true;
      messageDetail = errorResponse;
    } else if (errorResponse instanceof NotAuthenticatedError) {
      viewMessage = true;
      messageDetail = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof HttpErrorResponse
        && ((errorResponse.status >= 400 && errorResponse.status <= 403) ||
            (errorResponse.status >= 405 && errorResponse.status <= 499))) {
      viewMessage = true;
      messageDetail = 'Ocorreu um erro ao processar a sua solicitação';
      if (errorResponse.status === 403) {
        messageDetail = 'Você não tem permissão para executar esta ação';
      }
      try {
        console.log(errorResponse.error[0]);
        messageDetail = errorResponse.error[0].message;
      } catch (e) { }
      console.error('Ocorreu um erro', errorResponse);
    } else {
      if (errorResponse.status !== 404) {
        messageDetail = 'Erro ao processar serviço remoto. Tente novamente.';
        console.error('Ocorreu um erro', errorResponse);
      }
    }
    if (viewMessage) {
      this.messageService.add({ severity: 'error', life: 5000, summary: messageSummary,
        detail: messageDetail });
    }
  }
}
