import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, retry } from 'rxjs';

export interface Params {
  agencia: string;
  conta: string;
  dac: string;
}

export interface TabelaExtrato {
  dataLancamento: Date;
  lancamento: string;
  valor: number;
  saldo: number;
  saldoTotal: number;
  detalhes: string;
}

export interface Titulo {
  titulo: string;
}

export interface List {
  list: TabelaExtrato[];
}

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  URL_saldo = 'http://localhost:8080/saldoTotal';
  URL_ExtratoPassado = 'http://localhost:8080/extratoPassado';
  URL_EntradasFuturas = 'http://localhost:8080/entradasFuturas';
  URL_SaidasFuturas = 'http://localhost:8080/saidasFuturas';
  URL_EntradasPassadas = 'http://localhost:8080/entradasPassadas';
  URL_SaidasPassadas = 'http://localhost:8080/saidasPassadas';

  constructor(private http: HttpClient) {}

  getEntradasSaidas(params: Params): Observable<List> {
    return this.http.post<List>(this.URL_ExtratoPassado, params).pipe(
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
      }),
      retry(2)
    );
  }

  getEntradasFuturas(params: Params): Observable<List> {
    return this.http.post<List>(this.URL_EntradasFuturas, params).pipe(
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
      }),
      retry(2)
    );
  }

  getSaidasFuturas(params: Params): Observable<List> {
    return this.http.post<List>(this.URL_SaidasFuturas, params).pipe(
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
      }),
      retry(2)
    );
  }

  getSaidasPassadas(params: Params): Observable<List> {
    return this.http.post<List>(this.URL_SaidasPassadas, params).pipe(
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
      }),
      retry(2)
    );
  }

  getEntradasPassadas(params: Params): Observable<List> {
    return this.http.post<List>(this.URL_EntradasPassadas, params).pipe(
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
      }),
      retry(2)
    );
  }
  getSaldoDoDia(): Observable<number> {
    return this.http.post<number>(this.URL_saldo, {
      agencia: '5555',
      conta: '44444',
      dac: '1',
    });
  }

  extrato: Array<TabelaExtrato>;
}
