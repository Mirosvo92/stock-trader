import {Component, OnInit, ViewChild} from '@angular/core';
import {StocksService} from '../../shared/services/stocks.service';
import {UsersService} from '../../shared/services/user.service';
import {Stocks} from '../../shared/interfaces/stocks.interfaces';
import {disabledButton} from '../../shared/helpers/disabled';
import {FilterComponent} from '../filter/filter.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  userStocks: Stocks[];
  @ViewChild(FilterComponent) private counterComponent: FilterComponent;

  constructor(private stocksService: StocksService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.createListStocks();
  }

  createListStocks() {
    this.stocksService.getListUserStocks(this.usersService.id)
      .subscribe(data => {
        if (data) {
          this.userStocks = data;
        }
      });
  }

  sell(event, stocks: Stocks, quantity: string | number): void {
    const countStocks = this.validateQuantity(+quantity, stocks['count']);
    if (stocks['count'] === +countStocks) {
      this.delStocks(stocks['id'], +stocks['price'], countStocks, event);
    } else {
      stocks['count'] -= countStocks;
      this.update(stocks['count'], stocks['id'], +stocks['price'], event);
    }
  }

  private validateQuantity(quantity: number, count: number): number {
    if (quantity > count) {
      return count;
    } else if (quantity < 0) {
      return 1;
    } else {
      return quantity;
    }
  }

  update(count: number, id: number, price: number, event): void {
    this.stocksService.updateStocks(count, id).subscribe( data => {
      if (data) {
        this.setBalance(price, count);
        disabledButton(event, 'sell');
      }
    });
  }

  setBalance(price: number, count: number): void {
    const totalPrice = price * count;
    this.usersService.updateBalance.next({'price': totalPrice, 'operation': true});
  }

  delStocks(id: number, price: number, count: number, event) {
    this.stocksService.delStocks(id).subscribe( data => {
      if (data) {
        this.setBalance(price, count);
        this.counterComponent.cloneObject = undefined;
        this.delStocksFromArray(id);
        disabledButton(event, 'sell');
      }
    });
  }

  updateStocks(event): void {
    if (!event) {
      this.createListStocks();
    } else {
      this.userStocks = event;
    }
  }

  delStocksFromArray(id: number): void {
    const cloneUserStocks = JSON.parse(JSON.stringify(this.userStocks));
    for (let i = 0; i < cloneUserStocks.length; i++)  {
      if (this.userStocks[i]['id'] === id) {
        cloneUserStocks.splice(i, 1);
      }
    }
    this.userStocks = cloneUserStocks;
  }

}
