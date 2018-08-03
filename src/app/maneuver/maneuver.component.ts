import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Card } from '../Card';

@Component({
  selector: 'app-maneuver',
  templateUrl: './maneuver.component.html',
  styleUrls: ['./maneuver.component.css']
})
export class ManeuverComponent implements OnInit {
  @Input() maneuver: Card[][] = [
    [], [], [], [], [], [], []
  ];
  @Output() fromMan = new EventEmitter<string>();
  @Output() toMan = new EventEmitter<string>();
  @Output() clickMan = new EventEmitter<string>();
  @Output() clickMan2x = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onDragStart(event): void {
    if (!event.target.draggable) {
        this.fromMan.emit(null);
    } else {
        this.fromMan.emit(event.target.id);
        event.dataTransfer.effectAllowed = "move";
        let shadow = document.getElementById("shadow");
        while (shadow.firstChild) {
            shadow.removeChild(shadow.firstChild);
        }
        let collection = event.target.parentNode.children;
        for (let child of collection) {
            if (parseInt(child.id.slice(3)) >= parseInt(event.target.id.slice(3))) {
                shadow.appendChild(child.cloneNode());
            }
        }
        event.dataTransfer.setDragImage(shadow, event.layerX, event.layerY);
    }
  }

  onDragOver(event): void {
    event.preventDefault();
  }

  onDrop(event): void {
    this.toMan.emit(event.target.id);
  }

  onClick(event, isLast: boolean): void {
    if (!event.target.draggable && isLast) {
        this.clickMan.emit(event.target.id);
    }
  }

  onDoubleClick(event, isLast: boolean): void {
    if (event.target.draggable && isLast) {
        this.clickMan2x.emit(event.target.id);
    }
  }
}
