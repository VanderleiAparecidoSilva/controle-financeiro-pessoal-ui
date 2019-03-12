import { ContaBancariaDTO } from 'src/models/domain/contabancaria.dto';
import { UsuarioDTO } from './usuario.dto';

export class BaixaDTO {
  data = null;
  observacao: string;
  contaBancaria = null;
  usuario = new UsuarioDTO();
}
