export class LancamentoUploadDTO {
  descricao: string;
  centroCustoPrimario: string;
  centroCustoSecundario: string;
  vencimento = null;
  valorParcela: number = 0;
  parcela = null;
  gerarParcelaUnica = true;
  contaBancaria: string;
  observacao: string;
  status: string;
  tipoLancamento: string;
}
