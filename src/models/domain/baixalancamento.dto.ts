import { ContaBancariaDTO } from './contabancaria.dto';
import { UsuarioDTO } from './usuario.dto';

export class BaixaLancamentoDTO {
  data = null;
  observacao: string;
  contaBancaria = new ContaBancariaDTO();
  usuario = new UsuarioDTO();
}
