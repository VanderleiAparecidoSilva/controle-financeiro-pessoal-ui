import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { TITLE_CONFIG } from 'src/config/title.config';

@Component({
  selector: 'app-centrocusto-cadastro',
  templateUrl: './centrocusto-cadastro.component.html',
  styleUrls: ['./centrocusto-cadastro.component.css']
})
export class CentrocustoCadastroComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`${TITLE_CONFIG.childTitle} Cadastro de Centro de Custo`);
    console.log(this.route.snapshot.params['id']);
  }

}
