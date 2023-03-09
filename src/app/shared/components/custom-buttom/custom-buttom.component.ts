import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'custom-buttom',
  templateUrl: './custom-buttom.component.html',
  styleUrls: ['./custom-buttom.component.scss']
})
export class CustomButtomComponent implements OnInit {

  @Input()
  title: string = '';

  @Input()
  className: string = '';

  @Input()
  isLoading: boolean = false;

  @Output()
  onEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  action(){
    this.onEvent.emit();
  }
}
