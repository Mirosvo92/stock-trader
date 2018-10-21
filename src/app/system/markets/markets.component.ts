import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MarketsService} from '../../shared/services/markets.service';
import {Stocks} from '../../shared/interfaces/stocks.interfaces';
import {UsersService} from '../../shared/services/user.service';
import {StocksService} from '../../shared/services/stocks.service';
import {disabledButton} from '../../shared/helpers/disabled';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})
export class MarketsComponent implements OnInit {

  stocks: Stocks[];
  listStocks = [];
  userBalance: number;
  @ViewChild('quantity') quantity: ElementRef;

  constructor(private marketsService: MarketsService,
              private stocksService: StocksService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.createListStocks();

    this.stocksService.getListUserStocks(this.usersService.id)
      .subscribe( value => {
        if (value) {
          this.listStocks.push(...value);
        }
      }, error => {
        return false;
      });

    this.usersService.updateBalance.subscribe( value => {
      if (value['balance']) {
        this.userBalance = value['balance'];
      }
    });
  }

  createListStocks(): void {
    this.marketsService.getData().subscribe(data => {
      if (data) {
        this.stocks = data;
      }
    });
  }

  buy(event, stocks: Stocks, quantity: string | number): void {
    quantity = this.validateQuantity(+quantity);
    if (this.listStocks.length) {
      const stocksLength = this.listStocks.length;
      for (let i = 0; i < stocksLength; i++) {
        if (this.listStocks[i]['id'] === stocks['id']) {
          this.listStocks[i]['count'] += quantity;
          this.update(this.listStocks[i]['count'], stocks['id'], quantity, +stocks['price'], event);
          return;
        } else if (i === this.listStocks.length - 1) {
          this.firstPurchase(stocks, quantity, event);
          return;
        }
      }
    } else {
      this.firstPurchase(stocks, quantity, event);
    }
  }

  firstPurchase(stocks: Stocks, quantity: number, event): void {
    stocks['count'] = 1;
    this.listStocks.push(stocks);
    stocks['idUser'] = this.usersService.id;
    this.stocksService.addStocks(stocks).subscribe( data => {
      if (data) {
        this.setBalance(+stocks['price'], quantity);
        disabledButton(event, 'buy');
      }
    });
  }

  private validateQuantity(quantity: number): number {
    if (+quantity > 0) {
      return quantity;
    } else {
      this.quantity.nativeElement.value = 1;
      return 1;
    }
  }

  update(count: number, id: number, quantity: number, price: number, event): void {
    this.stocksService.updateStocks(count, id).subscribe( data => {
      if (data) {
        this.setBalance(price, quantity);
        disabledButton(event, 'buy');
      }
    });
  }

  setBalance(price: number, count: number): void {
    const totalPrice = price * count;
    this.usersService.updateBalance.next({'price': totalPrice, 'operation': false});
  }

  updateStocks(event): void {
    if (!event) {
      this.createListStocks();
    } else {
      this.stocks = event;
    }
  }

}
