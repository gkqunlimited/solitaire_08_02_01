import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Card } from '../Card';

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit {

  @Input() foundation: Card[][] = [
   [], [], [], [] 
  ];
  @Output() fromFound = new EventEmitter<string>();
  @Output() toFound = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  onDragStart(event, isLast: boolean): void {
    console.log(event.target.id);
    if (!event.target.draggable) {
      this.fromFound.emit(null);
    } else if (isLast) {
      this.fromFound.emit(event.target.id);
    }
  }

  onDragOver(event): void {
    event.preventDefault();
  }

  onDrop(event): void {
    this.toFound.emit(event.target.id);
  }
}
