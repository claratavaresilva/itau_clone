import { Component, OnInit } from '@angular/core';
import { DadosService } from './services/dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hasError: boolean;
  title = 'itau';

  constructor(private dadosService: DadosService) {}
  ngOnInit(): void {
    try {
      const httpResponse$ = this.dadosService.getEntradasSaidas({
        agencia: '0123',
        conta: '00587',
        dac: '1',
      });
    } catch (error) {
      this.hasError = true;
    }
  }
}
