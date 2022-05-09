import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizadoComponent } from './atualizado.component';

describe('AtualizadoComponent', () => {
  let component: AtualizadoComponent;
  let fixture: ComponentFixture<AtualizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
