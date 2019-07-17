import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { MessageService, SelectItem, DialogService } from 'primeng/api';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { LancamentoDTO } from './../../../models/domain/lancamento.dto';
import { LancamentoService } from './../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { UsuarioDTO } from 'src/models/domain/usuario.dto';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ContabancariaService } from './../../contabancaria/contabancaria.service';
import { CentrocustoService } from './../../centrocusto/centrocusto.service';
import { LancamentoFiltroDTO } from 'src/models/domain/lancamentofiltro.dto';
import { ListaDescricaoLancamentoComponent } from './lista-descricao-lancamento.component';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  providers: [DialogService]
})
export class LancamentoCadastroComponent implements OnInit {

  entityName = 'Lançamento';
  entity = new LancamentoDTO();

  calendarPortuguese: any;
  centroCustoPrimarioSelecionados: any[];
  centroCustoSecundarioSelecionados: any[];
  contaBancariaSelecionadas: any[];
  types: SelectItem[];

  typeChecked: boolean;
  totalValue = 0;

  constructor(
    private service: LancamentoService,
    private centroCustoService: CentrocustoService,
    private contaBancariaService: ContabancariaService,
    private errorHandle: ErrorHandlerService,
    private router: Router,
    private messageService: MessageService,
    private title: Title,
    private auth: AuthService,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.title.setTitle(`${environment.childTitle} Cadastro de ${this.entityName}`);
    const idEntity = this.route.snapshot.params['id'];
    if (idEntity) {
      this.loadEntity(idEntity);
    } else {
      if (this.router.url === '/lancamento/nova/receita') {
        this.entity.tipo = 'RECEITA';
      } else if (this.router.url === '/lancamento/nova/despesa') {
        this.entity.tipo = 'DESPESA';
      }
    }

    this.types = [];
    this.types.push({label: 'Receita', value: 'RECEITA', icon: 'fa fa-plus-circle'});
    this.types.push({label: 'Despesa', value: 'DESPESA', icon: 'fa fa-minus-circle'});

    this.defineCalendarPortuguese();
  }

  loadEntity(id: string) {
    this.service.findById(id)
      .then(response => {
        this.entity = response;
        this.updateEditTitle();
      })
      .catch(error => this.errorHandle.handle(error));
  }

  updateEditTitle() {
    this.title.setTitle(`${environment.childTitle} Alteração de ${this.entityName}: ${this.entity.descricao}`);
    this.refreshOnEdit();
  }

  refreshOnEdit() {
    this.entity.vencimento = new Date(moment(this.entity.vencimento, 'YYYY-MM-DD').toDate());
    this.onSpinnerChangeEvent(null);
  }

  get onEdit() {
    return Boolean(this.entity.id);
  }

  filtrarListaCentroCustoPorTipo(event) {
    const query = event.query;
    this.centroCustoService.findAllActiveByType(this.entity.tipo).then(data => {
        this.centroCustoPrimarioSelecionados = this.filtrarRegistro(query, data);
    });
  }

  filtrarListaCentroCustoPorTipoSecundaria(event) {
    const query = event.query;
    this.centroCustoService.findAllActiveByTypeSecondary(this.entity.tipo).then(data => {
        this.centroCustoSecundarioSelecionados = this.filtrarRegistro(query, data);
    });
  }

  filtrarListaContaBancaria(event) {
    const query = event.query;
    this.contaBancariaService.findAllActive().then(data => {
        this.contaBancariaSelecionadas = this.filtrarRegistro(query, data);
    });
  }

  filtrarRegistro(query, allData: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < allData.length; i++) {
      const data = allData[i];
      if (data.nome.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(data);
      }
    }
    return filtered;
  }

  filtrarRegistroLancamento(query, allData: any[]): any[] {
    const filtered: any[] = [];
    for (let i = 0; i < allData.length; i++) {
      const data = allData[i];
      if (data.nome.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(data);
      }
    }
    return filtered;
  }

  save(form: FormControl) {
    if (this.onEdit) {
      this.updateEntity(form);
    } else {
      this.insertEntity(form);
    }
  }

  insertEntity(form: FormControl) {
    this.entity.usuario = this.getUser();
    this.entity.contabancaria === '' ? this.entity.contabancaria = null : this.entity.contabancaria;
    (this.entity.observacao === undefined || this.entity.observacao === '') ? this.entity.observacao = null : this.entity.observacao;
    console.log(this.entity.observacao);
    this.service.save(this.entity)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: this.entityName,
          detail: `${this.entityName} cadastrado com sucesso!`});
        if (this.router.url === '/lancamento/nova/receita') {
          this.router.navigate(['/lancamento/nova/receita/', response.id]);
        } else if (this.router.url === '/lancamento/nova/despesa') {
          this.router.navigate(['/lancamento/nova/despesa/', response.id]);
        }
      })
      .catch(error => {
        this.errorHandle.handle(error);
      });
  }

  updateEntity(form: FormControl) {
    this.entity.usuario = this.getUser();
    this.entity.contabancaria === '' ? this.entity.contabancaria = null : this.entity.contabancaria;
    this.entity.observacao === '' ? this.entity.observacao = null : this.entity.observacao;
    this.service.update(this.entity)
    .then((response) => {
      this.entity = response;
      this.updateEditTitle();
      this.messageService.add({severity: 'success', summary: this.entityName,
        detail: `${this.entityName} atualizado com sucesso!`});
    })
    .catch(error => {
      this.errorHandle.handle(error);
    });
  }

  newEntity(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.entity = new LancamentoDTO();
    }.bind(this), 1);
    this.router.navigate(['/lancamento/nova/receita']);
  }

  getUser(): UsuarioDTO {
    const user = new UsuarioDTO();
    user.nome = this.auth.jwtPayload.name;
    user.email = this.auth.jwtPayload.user_name;
    user.senha = this.auth.jwtPayload.password;

    return user;
  }

  optionClick(event) {
    this.defineTipo(event.option.value);
    if (event.option.value !== this.entity.tipo) {
      this.typeChecked = false;
      const handleEvent: any = { 'checked' : 'false' };
      handleEvent.checked = false;
      this.handleChange(handleEvent);
    }
  }

  defineTipo(description) {
    this.entity.tipo = description;
  }

  handleChange(event) {
    if (event.checked) {
      if (this.entity.tipo === 'RECEITA') {
        this.entity.status = 'RECEBIDO';
      } else if (this.entity.tipo === 'DESPESA') {
        this.entity.status = 'PAGO';
      }
    } else {
      this.entity.status = 'ABERTO';
    }
  }

  onSpinnerChangeEvent(event) {
    this.onEdit ? this.totalValue = this.entity.valorParcela : this.totalValue = this.entity.valorParcela * this.entity.parcela;
  }

  defineCalendarPortuguese() {
    this.calendarPortuguese = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  findDescriptionByType() {
    const ref = this.dialogService.open(ListaDescricaoLancamentoComponent, {
      data: this.entity.tipo,
      header: 'Selecione a descrição',
      width: '70%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' }
    });

    ref.onClose.subscribe((name: LancamentoFiltroDTO) => {
        if (name) {
          this.entity.descricao = name.nome;
        }
    });
  }
}
