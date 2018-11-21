import { UsuarioDTO } from 'src/models/domain/usuario.dto';

export class TituloLancamentoDTO {
  id = null;
  nome: string;
  diaVencimento = 0;
  aplicarNaReceita = false;
  aplicarNaDespesa = false;
  usuario = new UsuarioDTO();
}
