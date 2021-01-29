import { Component, OnInit } from '@angular/core';
import {LABELS} from './labels.constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-info-customer',
  templateUrl: './info-customer.component.html',
  styleUrls: ['./info-customer.component.scss']
})
export class InfoCustomerComponent implements OnInit {

  public LABELS_BUTTONS = LABELS.button;
  public LABELS_TABLE = LABELS.table;
  public LABELS_SEARCH = LABELS.searchBar;
  public LABELS_MODAL = LABELS.modal;
  public MAXLENGTH = LABELS.maxLength;
  public formSearch: FormGroup;
  public formCreateNewCustomer: FormGroup;

  constructor(
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  /**
   * Method ngOnInit
   */
  public ngOnInit(): void {
    this.initForms();
  }

  /**
   * Method to show modal create new customer
   * @param modalCreateNewCustomer
   */
  public showCreateNewCustomer(modalCreateNewCustomer): void {
    this.ngbModal.open(modalCreateNewCustomer, {
      size: 'lg'
    });
  }

  /**
   * Method to init form of search
   */
  private initForms(): void {
    this.formSearch = this.formBuilder.group({
      sharedKeyText: [null, Validators.maxLength(this.MAXLENGTH.sharedKeyLength)]
    });
    this.formCreateNewCustomer = this.formBuilder.group({
      nameCustomer: [null, Validators.required, Validators.maxLength(this.MAXLENGTH.nameLength)],
      phoneCustomer: [null, Validators.required, Validators.maxLength(this.MAXLENGTH.phoneLength)],
      emailCustomer: [null, Validators.required, Validators.maxLength(this.MAXLENGTH.emailLength)],
      startDateCustomer: [null, Validators.required],
      endDateCustomer: [null, Validators.required]
    });
  }
}
