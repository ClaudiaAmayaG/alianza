import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {LABELS} from './labels.constants';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ICustomerDetail} from '../../../../model/customer-detail-model';
import {ISearchCustomer} from '../../../../model/search-customer-model';
import {CustomerManagerService} from '../../../../service/customer-manager.service';
import {ICreateCustomer} from '../../../../model/create-customer-model';

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
  public MESSAGE_ERROR = LABELS.messageErrors;
  public formSearch: FormGroup;
  public formCreateNewCustomer: FormGroup;
  public formAdvanceSearch: FormGroup;
  public customerDetailList: ICustomerDetail[];
  public searchFiltersCustomer: ISearchCustomer;
  public createCustomer: ICreateCustomer;
  public emailError: string;
  public showAdvanceSearch: boolean;

  constructor(
    private ngbModal: NgbModal,
    private formBuilder: FormBuilder,
    private customerManagerService: CustomerManagerService,
  ) {
  }

  /**
   * Method ngOnInit
   */
  public ngOnInit(): void {
    this.initForms();
    this.getCustomerList();
  }

  /**
   * Method to show modal create new customer
   * @param modalCreateNewCustomer
   */
  public showCreateNewCustomer(modalCreateNewCustomer): void {
    this.formCreateNewCustomer.reset();
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
        [
          Validators.required,
          Validators.maxLength(this.MAXLENGTH.nameLength)]),
      phoneCustomer: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(this.MAXLENGTH.phoneLength)]),
      emailCustomer: new FormControl(
        '',
        [
          Validators.required,
          Validators.maxLength(this.MAXLENGTH.emailLength)]),
      startDateCustomer: new FormControl(
        '',
        [Validators.required]),
      endDateCustomer: new FormControl(
        '',
        [Validators.required])
    });
    this.formAdvanceSearch = this.formBuilder.group({
      nameSearch: new FormControl(
        '',
        [Validators.maxLength(this.MAXLENGTH.nameLength)]),
      phoneSearch: new FormControl(
        '',
        [Validators.maxLength(this.MAXLENGTH.phoneLength)]),
      emailSearch: new FormControl(
        '',
        [Validators.maxLength(this.MAXLENGTH.emailLength)]),
      startDateSearch: new FormControl(''),
      endDateSearch: new FormControl('')
    });
  }

  /**
   * Method to get customer list
   */
  private getCustomerList(): void {
    this.searchFiltersCustomer = {
      sharedKey: null,
      name: null,
      phone: null,
      email: null,
      startDate: null,
      endDate: null
    };
    this.customerManagerService.searchCustomer(this.searchFiltersCustomer).subscribe(customer => {
      this.customerDetailList = customer;
    });
  }

  /**
   * Method to search by shared key
   */
  public searchCustomer(): void {
    this.searchFiltersCustomer = {
      sharedKey: this.formSearch.value.sharedKeyText ? this.formSearch.value.sharedKeyText : null,
      name: null,
      phone: null,
      email: null,
      startDate: null,
      endDate: null
    };
    this.customerManagerService.searchCustomer(this.searchFiltersCustomer).subscribe(customer => {
      this.customerDetailList = customer;
    });
  }

  /**
   * Method to search advance
   */
  public searchAdvance(): void {
    this.searchFiltersCustomer = {
      sharedKey: null,
      name: this.formAdvanceSearch.value.nameSearch ? this.formAdvanceSearch.value.nameSearch : null,
      phone: this.formAdvanceSearch.value.phoneSearch ? this.formAdvanceSearch.value.phoneSearch : null,
      email: this.formAdvanceSearch.value.emailSearch ? this.formAdvanceSearch.value.emailSearch : null,
      startDate: this.formAdvanceSearch.value.startDateSearch ? this.formAdvanceSearch.value.startDateSearch : null,
      endDate: this.formAdvanceSearch.value.endDateSearch ? this.formAdvanceSearch.value.endDateSearch : null
    };
    this.customerManagerService.searchCustomer(this.searchFiltersCustomer).subscribe(customer => {
      this.customerDetailList = customer;
    });
  }

  /**
   * Method to create customer
   */
  public save(): void {
    this.createCustomer = {
      name: this.formCreateNewCustomer.value.nameCustomer,
      phone: this.formCreateNewCustomer.value.phoneCustomer,
      email: this.formCreateNewCustomer.value.emailCustomer,
      startDate: this.formCreateNewCustomer.value.startDateCustomer,
      endDate: this.formCreateNewCustomer.value.endDateCustomer
    };
    this.customerManagerService.createCustomer(this.createCustomer).subscribe(customer => {
      if (customer) {
        this.ngbModal.dismissAll();
        this.ngOnInit();
      }
    });
  }

  /**
   * Method to validate letters
   */
  public validateLetters(event: KeyboardEvent): void{
    const letters = new RegExp('^[a-zA-Z +áéíóúñÁÉÍÓÚÑ ]+$');
    const value = event.key;
    if (!letters.test(value)){
     event.preventDefault();
    }
  }

  /**
   * Method to validate numbers
   */
  public validateNumbers(event: KeyboardEvent): void{
    const numbers = new RegExp('^[0-9]+$');
    const value = event.key;
    if (!numbers.test(value)){
      event.preventDefault();
    }
  }

  /**
   * Method to validate email
   */
  public validationEmail(abstractControl: AbstractControl): ValidationErrors {
    const charactersEmail = new RegExp('^[a-zA-Z0-9]+[_\w\.\-]*[a-zA-Z0-9]+@[a-zA-Z0-9][_\w\.\-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*$');
    const email = abstractControl.value;
    if (!charactersEmail.test(email)){
      this.emailError = this.MESSAGE_ERROR.messageEmail;
    }

    return {emailError: this.emailError};
  }
}
