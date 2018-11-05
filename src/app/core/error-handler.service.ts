import { ErrorDTO } from './../../models/error.dto';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let messageSummary: string;
    let messageDetail: string;


    if (typeof errorResponse === 'string') {
      messageDetail = errorResponse;
    } else {
      const errors: ErrorDTO = JSON.parse(errorResponse.error);
      if (errors.message) {
        messageSummary = errors.error;
        messageDetail = errors.message;
      } else {
        messageSummary = 'Erro';
        messageDetail = 'Erro ao processar requisição. Entre em contato com o administrador do sistema!';
      }
    }

    this.messageService.add({severity: 'error', life: 5000, summary: messageSummary,
          detail: messageDetail});
  }
}
