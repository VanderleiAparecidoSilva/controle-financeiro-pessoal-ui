import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

import { ErrorHandlerService } from '../error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createMenu();
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  createMenu() {
    this.items = [
      {
          label: 'Cadastros',
          icon: 'fa fa-keyboard-o',
          items: [
              {label: 'Centro de Custo', icon: 'fa fa-sitemap', routerLink: '/centrocusto'},
              {label: 'Conta Bancária', icon: 'fa fa-address-card-o', routerLink: '/contabancaria'}
          ]
      },
      {
          label: 'Lançamentos',
          icon: 'fa fa-wpforms',
          items: [
              {
                  label: 'Contas à Receber',
                  icon: 'fa fa-plus-circle'
              },
              {
                label: 'Contas à Pagar',
                icon: 'fa fa-minus-circle'
              },
              {
                  label: 'Múltiplo',
                  icon: 'fa fa-object-group',
                  items: [
                    {
                        label: 'Contas à Receber',
                        icon: 'fa fa-plus-circle'
                    },
                    {
                      label: 'Contas à Pagar',
                      icon: 'fa fa-minus-circle'
                    }
              ]}
          ]
      },
      {
          label: 'Relatórios',
          icon: 'fa fa-print',
          items: [
            {
              label: 'Lançamentos',
              items: [
                {
                  label: 'Receitas',
                  icon: 'fa fa-print'
                },
                {
                  label: 'Despesas',
                  icon: 'fa fa-print'
                }
              ]
            },
            {separator: true},
            {
              label: 'Contas Bancárias',
              icon: 'fa fa-print'
            }
          ]
      }
    ];
  }

}
