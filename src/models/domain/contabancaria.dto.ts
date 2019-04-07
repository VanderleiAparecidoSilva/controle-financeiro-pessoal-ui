import { UsuarioDTO } from 'src/models/domain/usuario.dto';

export class ContaBancariaDTO {
  id = null;
  nome: string;
  numeroContaBancaria: string;
  limiteContaBancaria = 0;
  saldoContaBancaria = 0;
  vincularSaldoBancarioNoTotalReceita = true;
  atualizarSaldoBancarioNaBaixaTitulo = true;
  contaBancariaPadrao = false;
  ativo = true;
  usuario = new UsuarioDTO();
}
