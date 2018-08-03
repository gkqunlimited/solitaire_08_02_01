import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Card } from '../Card';

@Component({
  selector: 'app-talon',
  templateUrl: './talon.component.html',
  styleUrls: ['./talon.component.css']
})
export class TalonComponent implements OnInit {

  @Input() talon: Card[];
  @Output() clickTalon = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(): void {
    this.clickTalon.emit();
  }

}
