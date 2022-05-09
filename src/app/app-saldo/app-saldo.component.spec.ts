import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSaldoComponent } from './app-saldo.component';

describe('AppSaldoComponent', () => {
  let component: AppSaldoComponent;
  let fixture: ComponentFixture<AppSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSaldoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
