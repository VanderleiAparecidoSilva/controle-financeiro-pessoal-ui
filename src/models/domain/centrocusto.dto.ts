import { UsuarioDTO } from 'src/models/domain/usuario.dto';

export class CentroCustoDTO {
  id = null;
  nome: string;
  aplicarNaReceita = false;
  aplicarNaDespesa = false;
  ativo = true;
  usuario = new UsuarioDTO();
}
