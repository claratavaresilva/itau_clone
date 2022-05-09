import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTabelaComponent } from './mat-tabela.component';

describe('EntradasSaidasComponent', () => {
  let component: MatTabelaComponent;
  let fixture: ComponentFixture<MatTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTabelaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
