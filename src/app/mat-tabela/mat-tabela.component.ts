import {
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { List, TabelaExtrato } from '../services/dados.service';

@Component({
  selector: 'mat-tabela',
  templateUrl: './mat-tabela.component.html',
  styleUrls: ['./mat-tabela.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MatTabelaComponent implements OnInit {
  @Input() dataSource: any;
  tituloTabela: string;
  exibirSaldo = false;
  @Input() dados: List;
  @Input() colunas: string[];
  @Input() titulo: string;

  constructor() {}

  ngOnInit() {
    /*     this.exibirSaldo = this.verificaSaldo(this.dados.dados);
     */
    this.tituloTabela = this.titulo;
    this.dataSource = new MatTableDataSource(this.dados.list);
  }

  /* verificaSaldo(dados: TabelaExtrato[]) {
    let soma;
    for (let index = 0; index < this.dados.dados.length; index++) {
      soma = dados[index].saldo;
      if (soma > 0) {
        return true;
      }
    }
    return false;
  } */
}
