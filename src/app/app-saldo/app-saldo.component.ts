import { Component, OnInit } from '@angular/core';
import { DadosService } from '../services/dados.service';

@Component({
  selector: 'app-saldo',
  templateUrl: './app-saldo.component.html',
  styleUrls: ['./app-saldo.component.scss']
})
export class AppSaldoComponent implements OnInit {
  resultSaldo!: number;
  resultConta!: Array<any>;
  senha!: string | null;

  constructor(private service: DadosService) {
   }

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem("display")!);
    this.getSaldo();
    this.getConta();
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem("display", JSON.stringify(this.toDisplay));
  }
  
  getSaldo() {
    this.service.getSaldo().subscribe(saldo => {
      saldo.map((a: {lis: '', saldo: ''}) => {
        this.resultSaldo = parseFloat(a.lis) + parseFloat(a.saldo);
      });
    }, err => {
      console.error('Erro ao listar os alunos', err);
    });
  }

  getConta() {
    this.service.getValidarConta().subscribe(conta => {
      conta.map((a: {agencia: '', conta: '', dac: '', nome: '', sobrenome: ''}) => {
        
        this.senha = prompt("Digite a senha");

        if (this.senha === '123456') {
          this.resultConta = [
            " Agência: " + a.agencia + 
            " Conta: " + a.conta + 
            " DAC: " + a.dac + 
            " Nome completo: " + a.nome + " " + a.sobrenome +
            " Senha: " + this.senha]
          console.log(this.resultConta)
          alert("Conexão realizada!" +
          this.resultConta);
        } else {
          console.log("Senha incorreta!")
          alert("Senha incorreta!");
        }
      })
    })
  }
  
}
