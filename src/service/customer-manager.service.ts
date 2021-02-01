import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICustomerDetail} from '../model/customer-detail-model';
import {Observable} from 'rxjs';
import {ISearchCustomer} from '../model/search-customer-model';
import {ICreateCustomer} from '../model/create-customer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerManagerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * Service to get customer list
   */
  public searchCustomer(searchFiltersCustomer: ISearchCustomer): Observable<ICustomerDetail[]> {
    return this.httpClient.post<ICustomerDetail[]>(
      'http://localhost:8080/customer-manager/search-customer',
      searchFiltersCustomer);
  }

  /**
   * Service to create customer
   */
  public createCustomer(createCustomer: ICreateCustomer): Observable<boolean> {
    return this.httpClient.post<boolean>(
      'http://localhost:8080/customer-manager/create-customer',
      createCustomer);
  }
}
