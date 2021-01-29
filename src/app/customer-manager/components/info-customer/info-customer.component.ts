import { Component, OnInit } from '@angular/core';
import {LABELS} from './labels.constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
      nameCustomer: new FormControl(
        '',
        [Validators.required,
                      Validators.maxLength(this.MAXLENGTH.nameLength),
                      Validators.pattern('^[a-zA-Z]+$')]),
      phoneCustomer: new FormControl(
        '',
        [Validators.required,
                      Validators.maxLength(this.MAXLENGTH.phoneLength),
                      Validators.pattern('^[0-9]*$')]),
      emailCustomer: new FormControl(
        '',
        [Validators.required, Validators.maxLength(this.MAXLENGTH.emailLength)]),
      startDateCustomer: new FormControl(
        '',
        [Validators.required]),
      endDateCustomer: new FormControl(
        '',
        [Validators.required])
    });
  }
}
