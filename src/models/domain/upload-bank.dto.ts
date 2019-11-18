import { UsuarioDTO } from './usuario.dto';

export class UploadBankDTO {
  id = null;
  descricao: string;
  centroCustoPrimario: string;
  centroCustoSecundario: string;
  diaVencimento = null;
  contaBancaria: string;
  linhaInicialArquivo = null;
  tipo: string;
  usuario = new UsuarioDTO();
}
