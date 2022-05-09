import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output() emitter: EventEmitter<string> = new EventEmitter<string>();

  emit(keyword: string) {
    this.emitter.emit(keyword);
  }

  searchText: string;

  /*   public filtroBusca(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } */
}
