import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {LABELS} from './labels.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() showInfoCustomerComponent = new EventEmitter<boolean>();
  public LABELS = LABELS.option;

  constructor() {
  }

  /**
   * Method ngOnInit
   */
  ngOnInit(): void {
  }

  /**
   * Method to show customer info
   */
  public showInfoCustomer(): void{
    this.showInfoCustomerComponent.emit(true);
  }

}
