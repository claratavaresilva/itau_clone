import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizado',
  templateUrl: './atualizado.component.html',
  styleUrls: ['./atualizado.component.scss'],
})
export class AtualizadoComponent implements OnInit {
  data: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
