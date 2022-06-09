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
  saldo$: Observable<number>;

  constructor(private dadosService: DadosService) {}

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem('display')!);
    this.saldo$ = this.dadosService.getSaldoDoDia();
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem('display', JSON.stringify(this.toDisplay));
  }
}
