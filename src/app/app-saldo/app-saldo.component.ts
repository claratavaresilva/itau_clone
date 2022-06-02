import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosService } from '../services/dados.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './app-saldo.component.html',
  styleUrls: ['./app-saldo.component.scss'],
})
export class AppSaldoComponent implements OnInit {
  URL_saldo = 'http://localhost:8080/saldoTotal';
  saldo$ = new Observable<number>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem('display')!);
    this.getSaldo();
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem('display', JSON.stringify(this.toDisplay));
  }

  getSaldo() {
    this.saldo$ = this.http.post<number>(this.URL_saldo, {
      agencia: '5555',
      conta: '44444',
      dac: '1',
    });
  }
}
