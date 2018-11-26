import { UsuarioDTO } from './usuario.dto';

export class LancamentoDTO {
  id = null;
  uuid = null;
  descricao: string;
  centrocusto: string;
  vencimento = null;
  valorParcela = 0;
  quantidadeTotalParcelas = 1;
  parcela = 0;
  gerarParcelaUnica = false;
  contabancaria: string;
  observacao: string;
  status = 'ABERTO';
  tipo = 'RECEITA';
  usuario = new UsuarioDTO();
  baixa = null;
}
