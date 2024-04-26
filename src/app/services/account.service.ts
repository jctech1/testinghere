import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) { }

  getAccountData(accountId: string) {
    return this.http.get(`/api/accounts/${accountId}`);
  }

  updateAccountData(accountId: string, data: Account) {
    return this.http.put(`/api/accounts/${accountId}`, data);
  }
}

