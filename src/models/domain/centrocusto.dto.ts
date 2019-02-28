import { UsuarioDTO } from 'src/models/domain/usuario.dto';

export class CentroCustoDTO {
  id = null;
  nome: string;
  primaria = true;
  secundaria = false;
  aplicarNaReceita = false;
  aplicarNaDespesa = false;
  ativo = true;
  usuario = new UsuarioDTO();
}
