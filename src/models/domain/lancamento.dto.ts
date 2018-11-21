import { UsuarioDTO } from './usuario.dto';
import { CentroCustoDTO } from './centrocusto.dto';
import { TituloLancamentoDTO } from './titulolancamento.dto';
import { ContaBancariaDTO } from './contabancaria.dto';
import { StatusLancamentoDTO } from './statuslancamento.dto';
import { TipoLancamentoDTO } from './tipolancamento.dto';
import { BaixaLancamentoDTO } from './baixalancamento.dto';

export class LancamentoDTO {
  id = null;
  uuid = null;
  nome = new TituloLancamentoDTO();
  centroCusto = new CentroCustoDTO();
  vencimento = null;
  valorParcela = 0;
  quantidadeTotalParcelas = 1;
  parcela = 0;
  gerarParcelaUnica = false;
  contaBancaria = new ContaBancariaDTO();
  observacao: string;
  status = new StatusLancamentoDTO();
  tipo = new TipoLancamentoDTO();
  usuario = new UsuarioDTO();
  baixa = new BaixaLancamentoDTO();
}
