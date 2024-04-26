// invoice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/invoice.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from '../services/user.service';  // Import UserService


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private totalCost: number = 0;

  constructor(private http: HttpClient, private userService: UserService) { }  // Inject UserService

  setTotalCost(totalCost: number): void {
    this.totalCost = totalCost;
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  calculateInvoiceTotalPrice(subtotal: number, weightPrice: number, otherCost: number = 15): number {
    return subtotal + weightPrice + otherCost;
  }

  calculateInvoiceWeightPrice(totalWeight: number, rate: number = 10): number {
    return Math.ceil(totalWeight) * rate;
  }

  saveInvoice(invoice: Invoice) {
    const user = this.userService.getCurrentUserValue();  // Get the current user
    if (user) {
      const userId = user.uid;  // Get the user's ID
      // Include the userId in the URL for the POST request
      return this.http.post(`http://localhost:3000/api/invoices/${userId}`, invoice)
        .pipe(
          catchError(error => {
            console.error('Error saving invoice:', error);
            return throwError(error);
          })
        );
    } else {
      console.error('User is not logged in.');
      return throwError('User is not logged in.');
    }
  }

  getOrders() {
    return this.http.get<Invoice[]>('http://localhost:3000/api/invoices')
      .pipe(
        catchError(error => {
          console.error('Error fetching invoices:', error);
          return throwError(error);
        })
      );
  }
}
