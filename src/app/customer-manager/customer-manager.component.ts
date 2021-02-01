import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuComponent} from './components/menu/menu.component';

/**
 * Component customer manager.
 *
 * @author camaya@asesoftware.com
 * @version 1.0.0
 */
@Component({
  selector: 'app-customer-manager',
  templateUrl: './customer-manager.component.html',
  styleUrls: ['./customer-manager.component.scss']
})
export class CustomerManagerComponent implements OnInit {

  @ViewChild(MenuComponent) menuComponent;

  public showInfoCustomer: boolean;

  constructor() {
  }

  /**
   * Method ngOnInit
   */
  public ngOnInit(): void {
  }

  /**
   * Method to show component
   */
  public showComponent(event: boolean): void {
    this.showInfoCustomer = event;
  }
}
