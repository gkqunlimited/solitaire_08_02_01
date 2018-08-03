import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Card } from '../Card';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @Input() stock: Card[];
  @Output() clickStock = new EventEmitter<string>();
  @Output() clickStock2x = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onDragStart(event, isFirst: boolean) {
    if (isFirst) {
      this.clickStock.emit(event.target.id);
    }
  }

  onDoubleClick(event, isFirst: boolean): void {
    if (event.target.draggable && isFirst) {
      this.clickStock2x.emit(event.target.id);
    }
  }

}
