import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {
  DadosService,
  ModuloTabela,
  TabelaExtrato,
} from '../services/dados.service';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  @Output() dataSource: any;
  tituloTabela: string;
  exibirSaldo = false;
  @Input() titulo: string;
  @Input() dados: ModuloTabela;
  @Input() colunas: string[];

  constructor(private dadosService: DadosService) {}

  ngOnInit() {
    this.tituloTabela = this.dados.titulo;
    this.exibirSaldo = this.verificaSaldo(this.dados.dados);
    this.dataSource = new MatTableDataSource(this.dados.dados);
  }

  getDados() {
    this.dadosService;
  }

  verificaSaldo(dados: TabelaExtrato[]) {
    let soma;
    for (let index = 0; index < this.dados.dados.length; index++) {
      soma = dados[index].saldo;
      if (soma > 0) {
        return true;
      }
    }
    return false;
  }
}
