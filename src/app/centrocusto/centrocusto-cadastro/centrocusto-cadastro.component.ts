import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { UsuarioDTO } from './../../../models/domain/usuario.dto';
import { CentrocustoService } from './../centrocusto.service';
import { CentroCustoDTO } from 'src/models/domain/centrocusto.dto';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-centrocusto-cadastro',
  templateUrl: './centrocusto-cadastro.component.html',
  styleUrls: ['./centrocusto-cadastro.component.css']
})
export class CentrocustoCadastroComponent implements OnInit {

  entityName = 'Centro de Custo';
  entity = new CentroCustoDTO();

  constructor(
    private service: CentrocustoService,
    private errorHandle: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`${environment.childTitle} Cadastro de ${this.entityName}`);
    const idEntity = this.route.snapshot.params['id'];

    if (idEntity) {
      this.loadEntity(idEntity);
    }
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
    this.title.setTitle(`${environment.childTitle} Alteração do ${this.entityName}: ${this.entity.nome}`);
  }

  get onEdit() {
    return Boolean(this.entity.id);
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
    this.service.save(this.entity)
      .then((response) => {
        this.messageService.add({severity: 'success', summary: this.entityName,
          detail: `${this.entityName} cadastrado com sucesso!`});
        this.router.navigate(['/centrocusto', response.id]);
      })
      .catch(error => {
        this.errorHandle.handle(error);
      });
  }

  updateEntity(form: FormControl) {
    this.entity.usuario = this.getUser();
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
      this.entity = new CentroCustoDTO();
    }.bind(this), 1);

    this.router.navigate(['/centrocusto/novo']);
  }

  getUser(): UsuarioDTO {
    const user = new UsuarioDTO();
    user.nome = this.auth.jwtPayload.name;
    user.email = this.auth.jwtPayload.user_name;
    user.senha = this.auth.jwtPayload.password;

    return user;
  }
}
