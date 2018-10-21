import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BaseApi} from './services/base-api.service';
import {UsersService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './services/auth-guard';
import {SystemGuard} from './services/system.guard';
import {MarketsService} from './services/markets.service';
import {StocksService} from './services/stocks.service';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    BaseApi,
    AuthService,
    AuthGuard,
    SystemGuard,
    MarketsService,
    StocksService
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {}
