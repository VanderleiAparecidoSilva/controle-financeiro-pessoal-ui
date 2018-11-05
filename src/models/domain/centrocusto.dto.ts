import { UsuarioDTO } from './usuario.dto';

export interface CentroCustoDTO {
  id: string;
  nome: string;
  aplicarNaReceita: boolean;
  aplicarNaDespesa: boolean;
  usuario: UsuarioDTO;
  ativo: boolean;
}
