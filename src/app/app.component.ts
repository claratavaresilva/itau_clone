import { Component, OnInit } from '@angular/core';
import { List } from './services/dados.service';
import { DadosService } from './services/dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hasError: boolean;
  title = 'itau';
  extrato: List;

  constructor(private dadosService: DadosService) {}
  ngOnInit(): void {
    try {
      const httpResponse$ = this.dadosService.getEntradasSaidas({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      });
      httpResponse$.subscribe((response) => (this.extrato = response));
    } catch (error) {
      this.hasError = true;
    }
  }
}
