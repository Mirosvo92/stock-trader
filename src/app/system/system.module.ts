import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { AuthGuard } from '../shared/services/auth-guard';
import { MarketsComponent } from './markets/markets.component';
import { SystemRoutingModule } from './system-routng.module';
import { SharedModule } from '../shared/shared.module';
import { PortfolioComponent } from './portfolio/portfolio.component';
import {FilterComponent} from './filter/filter.component';


@NgModule({
  declarations: [
  SystemComponent,
  MarketsComponent,
  PortfolioComponent,
  FilterComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ],
  providers: [AuthGuard]
})
export class SystemModule {}
