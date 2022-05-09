import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppSaldoComponent } from './app-saldo/app-saldo.component';
import { DadosService } from './services/dados.service';
import { AtualizadoComponent } from './atualizado/atualizado.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTabelaComponent } from './mat-tabela/mat-tabela.component';
import { RodapeComponent } from './rodape/rodape.component';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LOCALE_ID } from '@angular/core';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppSaldoComponent,
    MatTabelaComponent,
    RodapeComponent,
    AtualizadoComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CdkAccordionModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [
    DadosService,
    HttpClientModule,
    { provide: LOCALE_ID, useValue: 'pt-Br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
