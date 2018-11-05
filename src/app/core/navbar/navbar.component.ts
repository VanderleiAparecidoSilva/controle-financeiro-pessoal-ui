import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { StorageService } from 'src/app/seguranca/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.items = [
      {
          label: 'Cadastros',
          icon: 'fa fa-keyboard-o',
          items: [
              {label: 'Centro de Custo', icon: 'fa fa-sitemap', routerLink: '/centrocustos'},
              {label: 'Conta Bancária', icon: 'fa fa-address-card-o'}
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
