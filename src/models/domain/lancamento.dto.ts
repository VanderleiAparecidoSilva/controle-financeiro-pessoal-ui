import { BaixaDTO } from './baixa.dto';
import { UsuarioDTO } from './usuario.dto';

export class LancamentoDTO {
  id = null;
  uuid = null;
  descricao: string;
  centroCustoPrimario: string;
  centroCustoSecundario: string;
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
  parcelaComTotalParcelas: string;
  parcelaAtrasada = false;
}
