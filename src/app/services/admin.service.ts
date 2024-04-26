import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>('/api/invoices');
  }

  approveInvoice(invoiceId: string): Observable<any> {
    // Replace '/api/approveInvoice' with the actual API endpoint to approve an invoice
    return this.http.post(`/api/approveInvoice/${invoiceId}`, {});
  }
  rejectInvoice(invoiceId: string): Observable<any> {
    // Replace with the actual API endpoint to reject an invoice
    return this.http.post(`/api/rejectInvoice/${invoiceId}`, {});
  }
  

}
