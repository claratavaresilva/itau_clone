import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, map, Observable } from 'rxjs';
import { DadosService, List, TabelaExtrato } from '../services/dados.service';
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
  periodo: number;
  saldo: number;
  lancamento: any;
  resultado: boolean = false;
  btn: string;
  totalSaldoAnterior$: Observable<number>;

  constructor(private dadosService: DadosService) {}

  ngOnInit(): void {
    this.entradasSaidas$ = this.changeExtrato(this.botao);
    this.entradasFuturas$ = this.entradasFuturas;
    this.saidasFuturas$ = this.saidasFuturas;
    this.dadosService
      .getSaldoDoDia()
      .subscribe((response) => (this.saldo = response));
  }

  //pegando os lancamentos futuros
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

  //pegando os lancamentos passados
  public saidas = this.dadosService
    .getSaidasPassadas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((value) => {
        let dados = value.list;
        let dadosFiltrados = this.filtro(dados); //filtro de acordo com o periodo
        let dadosOrdenados = this.sortArray(dadosFiltrados); //ordenação de acordo com a ordem selecionada
        return {
          list: dadosOrdenados,
        };
      })
    );
  public entradas = this.dadosService
    .getEntradasPassadas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((value) => {
        let dados = value.list;
        let dadosFiltrados = this.filtro(dados);
        let dadosOrdenados = this.sortArray(dadosFiltrados);
        return {
          list: dadosOrdenados,
        };
      })
    );
  public entradasSaidas = this.dadosService
    .getEntradasSaidas({
      agencia: '0123',
      conta: '00587',
      dac: '1',
    })
    .pipe(
      map((value) => {
        let dados = value.list
          .reverse()
          .map((item: TabelaExtrato, index: number) => {
            if (index == 0) {
              item.saldoTotal = this.saldo;
            } else {
              item.saldoTotal =
                value.list[index - 1].saldoTotal - value.list[index - 1].valor;
            }
            return item;
          });
        dados = dados.reverse();
        let count = 0;
        while (dados[count]) {
          this.setDados(dados[count], count, dados);
          count++;
        }
        let dadosFiltrados = this.PushSaldo(dados);
        let dadosOrdenados = this.sortArray(dadosFiltrados);

        return {
          list: dadosOrdenados,
        };
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
      return this.entradasSaidas$;
    } else if (extrato === 'saidas') {
      this.botao = 'saidas';
      this.entradasSaidas$ = this.saidas;
      this.entradasFuturas$ = EMPTY;
      this.saidasFuturas$ = this.saidasFuturas;
      return this.entradasSaidas$;
    } else if (extrato === 'entradas') {
      this.botao = 'entradas';
      this.entradasSaidas$ = this.entradas;
      this.entradasFuturas$ = this.entradasFuturas;
      this.saidasFuturas$ = EMPTY;
      return this.entradasSaidas$;
    } else if (extrato === 'futuros') {
      this.botao = 'futuros';
      this.entradasSaidas$ = EMPTY;
      this.entradasFuturas$ = this.entradasFuturas;
      this.saidasFuturas$ = this.saidasFuturas;
      return this.entradasSaidas$;
    }
    return this.entradasSaidas$;
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
  options: Option[] = [
    { id: 1, viewValue: 'ontem' },
    { id: 7, viewValue: 'últimos 7 dias' },
    { id: 30, viewValue: 'último mês' },
    { id: 90, viewValue: 'últimos 3 meses' },
  ];
  optionSelected(event: any) {
    const periodo = event;
    this.selectedPeriodo = periodo;
    if (this.botao == 'todos') {
      this.entradasSaidas$ = this.dadosService
        .getEntradasSaidas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((value) => {
            let dados = value.list
              .reverse()
              .map((item: TabelaExtrato, index: number) => {
                if (index == 0) {
                  item.saldoTotal = this.saldo;
                } else {
                  item.saldoTotal =
                    value.list[index - 1].saldoTotal -
                    value.list[index - 1].valor;
                }
                return item;
              });
            dados = dados.reverse();
            let count = 0;
            while (dados[count]) {
              this.setDados(dados[count], count, dados);
              count++;
            }
            let dadosFiltrados = this.PushSaldo(dados);
            let dadosOrdenados = this.sortArray(dadosFiltrados);

            return {
              list: dadosOrdenados,
            };
          })
        );
    } else if (this.botao == 'entradas') {
      this.entradasSaidas$ = this.dadosService
        .getEntradasPassadas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((value) => {
            let dados = value.list;
            let dadosFiltrados = this.filtro(dados);
            let dadosOrdenados = this.sortArray(dadosFiltrados);
            return {
              list: dadosOrdenados,
            };
          })
        );
    } else if (this.botao == 'saidas') {
      this.entradasSaidas$ = this.dadosService
        .getSaidasPassadas({ agencia: '0123', conta: '00587', dac: '1' })
        .pipe(
          map((value) => {
            let dados = value.list;
            let dadosFiltrados = this.filtro(dados);
            let dadosOrdenados = this.sortArray(dadosFiltrados);
            return {
              list: dadosOrdenados,
            };
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
    this.selectedSort = event;
    if (this.selectedSort == 1) {
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
    } else if (this.selectedSort == 2) {
      this.entradasSaidas$ = this.entradasSaidas$.pipe(
        map((items) => {
          let dadosOrdenados = items.list.sort(
            (y, x) =>
              +new Date(x.dataLancamento).getTime() -
              +new Date(y.dataLancamento).getTime()
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

  //faz a ordenação dos dados de acordo com a ordenação selecionada
  sortArray(array: TabelaExtrato[]) {
    if (this.selectedSort == 1) {
      array.sort(
        (a, b) =>
          +new Date(a.dataLancamento).getTime() -
          +new Date(b.dataLancamento).getTime()
      );
    } else if (this.selectedSort == 2) {
      array.sort(
        (b, a) =>
          +new Date(a.dataLancamento).getTime() -
          +new Date(b.dataLancamento).getTime()
      );
    }
    return array;
  }

  //adiciona o saldo do dia em cada um dos dias
  private setDados(
    value: TabelaExtrato,
    index: number,
    array: TabelaExtrato[]
  ) {
    if (
      array[index + 1] &&
      value.dataLancamento !== array[index + 1].dataLancamento &&
      array[index].saldoTotal
    ) {
      array.splice(index + 1, 0, {
        dataLancamento: value.dataLancamento,
        detalhes: '',
        saldo: value.saldoTotal,
        lancamento: 'SALDO DO DIA',
        valor: 0,
        saldoTotal: value.saldo,
      });
    }
  }
  //adiciona o saldo anterior e o saldo do dia de hoje na tabela
  private PushSaldo(array: TabelaExtrato[]) {
    let dadosAnteriores = array.filter(
      (data) =>
        +new Date(data.dataLancamento).getTime() <
        +new Date().getTime() - this.selectedPeriodo * 86400000
    );

    let dadosfiltrados = array.filter(
      (data) =>
        +new Date(data.dataLancamento).getTime() >=
        +new Date().getTime() - this.selectedPeriodo * 86400000
    );
    dadosfiltrados.push({
      dataLancamento: array[array.length - 1].dataLancamento,
      lancamento: 'SALDO DO DIA',
      saldo: array[array.length - 1].saldoTotal,
      valor: 0,
      saldoTotal: 0,
      detalhes: '',
    });
    dadosfiltrados.splice(0, 0, {
      dataLancamento:
        dadosAnteriores[dadosAnteriores.length - 1].dataLancamento,
      lancamento: 'SALDO ANTERIOR',
      saldoTotal: 0,
      saldo: dadosAnteriores[dadosAnteriores.length - 1].saldo,
      detalhes: '',
      valor: 0,
    });
    return dadosfiltrados;
  }
  //filtra o array de acordo com o periodo selecionado
  filtro(array: TabelaExtrato[]) {
    let dadosfiltrados = array.filter(
      (data) =>
        +new Date(data.dataLancamento).getTime() >=
        +new Date().getTime() - this.selectedPeriodo * 86400000
    );
    return dadosfiltrados;
  }
}
