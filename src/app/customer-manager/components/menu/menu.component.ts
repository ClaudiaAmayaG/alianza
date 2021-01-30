import {Component, OnInit} from '@angular/core';
import {LABELS} from './labels.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public LABELS = LABELS.option;

  constructor() {
  }

  ngOnInit(): void {
  }

}
