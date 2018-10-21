import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Stocks} from '../../shared/interfaces/stocks.interfaces';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  @Input('stocks') stocks: Stocks[];
  @Output() updateList = new EventEmitter();
  listCategory = [];
  categoryGroup: FormGroup;
  cloneObject: Stocks[];

  constructor() { }

  ngOnInit() {
    this.categoryGroup = new FormGroup({});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['stocks'] && changes['stocks']['currentValue']) {
      if (!this.cloneObject) {
        this.cloneObject = JSON.parse(JSON.stringify(changes['stocks']['currentValue']));
        this.setCategory(changes['stocks']['currentValue']);
      }
    }
  }

  setCategory(data: Stocks[]): void {
    this.listCategory = [];
    data.forEach( el => {
      if (this.listCategory.indexOf(el['category']) === -1 ) {
        this.listCategory.push(el['category']);
      }
    });
    this.createForm();
  }

  chooseFilter(event): void {
    const activeCategory = [];
    const list = this.categoryGroup.controls.categoryArray.value;
    list.forEach( (el, i) => {
      if (el) {
        activeCategory.push(this.listCategory[i]);
      }
    });
    this.showElementByFilter(activeCategory);
  }

  showElementByFilter(activeCategory): void {
    const filterStocks = [];
    this.cloneObject.forEach( el => {
      if (activeCategory.indexOf(el['category']) !== -1) {
        filterStocks.push(el);
      }
    });
    if (filterStocks.length) {
      this.updateList.emit(filterStocks);
    } else {
      this.updateList.emit(false);
    }
  }

  createForm(): void {
    const control = [];
    this.listCategory.forEach((x) => {
      control.push(new FormControl(false));
    });
    this.categoryGroup.addControl('categoryArray', new FormArray(control));
  }

}
