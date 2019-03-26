import { UsuarioDTO } from './usuario.dto';

export class LancamentoDTO {
  id = null;
  uuid = null;
  descricao: string;
  centroCustoPrimario: string;
  centroCustoSecundario: string;
  vencimento = null;
  valorParcela = 0;
  parcela = 1;
  gerarParcelaUnica = false;
  contabancaria: string;
  observacao: string;
  status = 'ABERTO';
  tipo = 'RECEITA';
  usuario = new UsuarioDTO();
  baixa = null;
  parcelaComTotalParcelas: string;
  parcelaAtrasada = false;
}
