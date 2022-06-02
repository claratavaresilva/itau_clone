import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, map, Observable } from 'rxjs';
import { DadosService, List } from '../services/dados.service';

interface Option {
  id: number;
  viewValue: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  entradasSaidas$: Observable<List>;
  entradasFuturas$: Observable<List>;
  saidasFuturas$: Observable<List>;
  lancamentosFuturosAberto = false;
  colunas: string[] = ['data', 'lancamentos', 'valor', 'saldo', 'detalhes'];
  selectedPeriodo = 7;
  lancamento: any;
  resultado: boolean = false;
  btn: string;
  totalSaldoAnterior$: Observable<number>;

  constructor(private dadosService: DadosService) {}

  ngOnInit(): void {
    this.entradasSaidas$ = this.entradasSaidas;
    this.entradasFuturas$ = this.entradasFuturas;
    this.saidasFuturas$ = this.saidasFuturas;
  }

  public entradasFuturas = this.dadosService.getEntradasFuturas({
    agencia: '0123',
    conta: '00587',
    dac: '1',
  });

  public saidasFuturas = this.dadosService.getSaidasFuturas({
    agencia: '0123',
    conta: '00587',
    dac: '1',
  });

  public saidas = this.dadosService
    .getSaidasPassadas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((response) => {
        let dadosFiltrados = response.list.filter(
          (data) =>
            +new Date(data.dataLancamento).getTime() >=
            +new Date().getTime() - this.selectedPeriodo * 86400000
        );
        let list = {
          list: dadosFiltrados,
        };
        return list;
      })
    );
  public entradas = this.dadosService
    .getEntradasPassadas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((response) => {
        let dadosFiltrados = response.list.filter(
          (data) =>
            +new Date(data.dataLancamento).getTime() >=
            +new Date().getTime() - this.selectedPeriodo * 86400000
        );
        let list = {
          list: dadosFiltrados,
        };
        return list;
      })
    );

  public entradasSaidas = this.dadosService
    .getEntradasSaidas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((response) => {
        let dadosFiltrados = response.list.filter(
          (data) =>
            +new Date(data.dataLancamento).getTime() >=
            +new Date().getTime() - this.selectedPeriodo * 86400000
        );
        let list = {
          list: dadosFiltrados,
        };
        return list;
      })
    );
  //filtro botoes
  botao: string = 'todos';
  changeExtrato(extrato: string) {
    if (extrato === 'todos') {
      this.botao = 'todos';
      this.entradasSaidas$ = this.entradasSaidas;
      this.entradasFuturas$ = this.entradasFuturas;
      this.saidasFuturas$ = this.saidasFuturas;
    } else if (extrato === 'saidas') {
      this.botao = 'saidas';
      this.entradasSaidas$ = this.saidas;
      this.entradasFuturas$ = EMPTY;
      this.saidasFuturas$ = this.saidasFuturas;
      return true;
    } else if (extrato === 'entradas') {
      this.botao = 'entradas';
      this.entradasSaidas$ = this.entradas;
      this.entradasFuturas$ = this.entradasFuturas;
      this.saidasFuturas$ = EMPTY;
      return true;
    } else if (extrato === 'futuros') {
      this.botao = 'futuros';
      this.entradasSaidas$ = EMPTY;
      this.entradasFuturas$ = this.entradasFuturas;
      this.saidasFuturas$ = this.saidasFuturas;
      return true;
    }
    return true;
  }

  //cor do filtro de botoes
  btnTodos = true;
  btnSaidas = true;
  btnEntradas = true;
  btnFuturos = true;

  enableDisableRule(btn: string) {
    if (btn == 'todos') {
      this.btn = 'todos';
      this.btnTodos = true;
      this.btnEntradas = true;
      this.btnSaidas = true;
      this.btnFuturos = true;
    } else if (btn == 'saidas') {
      this.btnSaidas = !this.btnSaidas;
      this.btnTodos = false;
      this.btnEntradas = true;
      this.btnFuturos = true;
    } else if (btn == 'entradas') {
      this.btnEntradas = !this.btnEntradas;
      this.btnTodos = false;
      this.btnSaidas = true;
      this.btnFuturos = true;
    } else if (btn == 'futuros') {
      this.btnFuturos = !this.btnFuturos;
      this.btnTodos = false;
      this.btnSaidas = true;
      this.btnEntradas = true;
    }
  }

  //filtro de periodo
  periodo: string;
  options: Option[] = [
    { id: 1, viewValue: 'ontem' },
    { id: 7, viewValue: 'últimos 7 dias' },
    { id: 30, viewValue: 'último mês' },
    { id: 90, viewValue: 'últimos 3 meses' },
  ];
  optionSelected(event: any) {
    const periodo = event;
    this.selectedPeriodo = periodo.value;

    if (this.botao == 'todos') {
      this.entradasSaidas$ = this.dadosService
        .getEntradasSaidas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((response) => {
            let dadosFiltrados = response.list.filter(
              (data) =>
                +new Date(data.dataLancamento).getTime() >=
                +new Date().getTime() - periodo * 86400000
            );
            let list = {
              list: dadosFiltrados,
            };
            return list;
          })
        );
    } else if (this.botao == 'entradas') {
      this.entradasSaidas$ = this.dadosService
        .getEntradasPassadas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((response) => {
            let dadosFiltrados = response.list.filter(
              (data) =>
                +new Date(data.dataLancamento).getTime() >=
                +new Date().getTime() - periodo * 86400000
            );
            let list = {
              list: dadosFiltrados,
            };
            return list;
          })
        );
    } else if (this.botao == 'saidas') {
      this.entradasSaidas$ = this.dadosService
        .getSaidasPassadas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((response) => {
            let dadosFiltrados = response.list.filter(
              (data) =>
                +new Date(data.dataLancamento).getTime() >=
                +new Date().getTime() - periodo * 86400000
            );
            let list = {
              list: dadosFiltrados,
            };
            return list;
          })
        );
    }
  }

  //ordenação
  selectedSort = 1;
  ordem: number;
  sorts: Option[] = [
    { id: 1, viewValue: 'mais antigo' },
    { id: 2, viewValue: 'mais recente' },
  ];

  sort(event: any) {
    this.ordem = event;
    if (this.ordem == 1) {
      this.entradasSaidas$ = this.entradasSaidas$.pipe(
        map((items) => {
          let dadosOrdenados = items.list.sort(
            (x, y) =>
              +new Date(x.dataLancamento).getTime() -
              +new Date(y.dataLancamento).getTime()
          );
          let list = {
            list: dadosOrdenados,
          };
          return list;
        })
      );
    } else if (this.ordem == 2) {
      this.entradasSaidas$ = this.entradasSaidas$.pipe(
        map((items) => {
          let dadosOrdenados = items.list.sort(
            (x, y) =>
              +new Date(y.dataLancamento).getTime() -
              +new Date(x.dataLancamento).getTime()
          );
          let list = {
            list: dadosOrdenados,
          };
          return list;
        })
      );
    }
  }

  //filtro de busca
  Search() {
    if (this.lancamento == '') {
      this.botao = 'todos';
      this.btnTodos = true;
      this.btnEntradas = true;
      this.btnFuturos = true;
      this.btnSaidas = true;
      this.resultado = false;
      this.ngOnInit();
    } else {
      this.resultado = true;
      this.entradasSaidas$ = this.entradasSaidas$.pipe(
        map((response) => {
          let dadosFiltrados = response.list.filter((data) =>
            data.lancamento
              .toLowerCase()
              .trim()
              .match(this.lancamento.toLowerCase().trim())
          );
          let list = {
            list: dadosFiltrados,
          };
          return list;
        })
      );
    }
  }
  /* 
  this.totalSaldoAnterior$ = this.entradasSaidas.pipe(
    map((items) => 
  )) */
}
