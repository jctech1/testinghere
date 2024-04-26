import { Injectable } from '@angular/core';  // Import Injectable from @angular/core
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceData } from '../models/invoice.model';  // Import InvoiceData from models
import { Order } from '../models/order.model'; // Import Order from models

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) { }

  //getUserOrders(userId: string): Observable<InvoiceData[]> {  // Add return type Observable<InvoiceData[]>
  //  return this.http.get<InvoiceData[]>(`/api/orders/${userId}`);  // Add type InvoiceData[] to this.http.get
 // }
 getUserOrders(userId: string): Observable<Order[]> { // Return type is now Observable<Order[]>
  return this.http.get<Order[]>(`/api/orders/${userId}`); // Use type Order[] for this.http.get
}


 // order.service.ts
createOrder(userId: string, orderData: any) {
  return this.http.post(`/api/invoices/${userId}`, orderData);  // include the userId in the URL
}

}
