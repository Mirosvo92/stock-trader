import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SystemComponent} from './system.component';
import {MarketsComponent} from './markets/markets.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {SystemGuard} from '../shared/services/system.guard';

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [SystemGuard], children: [
      {path: 'markets', component: MarketsComponent},
      {path: 'portfolio', component: PortfolioComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
