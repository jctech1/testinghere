import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';  // Import OrderService
import { UserService } from '../services/user.service';  // Import UserService
import { InvoiceData } from '../models/invoice.model';  // Import InvoiceData from models
import { Order } from '../models/order.model'; // Import Order from models

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit {
  //invoices: InvoiceData[] = [];  // Declare invoices as InvoiceData[]
  orders: Order[] = []; // Declare orders as Order[]


  constructor(private orderService: OrderService, private userService: UserService) { }  // Use OrderService and UserService

  ngOnInit(): void {
   // const user = this.userService.getCurrentUserValue();
   const user = this.userService.getCurrentUserValue();
console.log("User in OrdenesComponent:", user);  // <-- Add this line
    if (user) {
      const userId = user.uid;  // Assuming 'uid' is the user's unique identifier
      this.orderService.getUserOrders(userId)  // Use getUserOrders method from OrderService
        //.subscribe((invoices: InvoiceData[]) => {  // Explicitly declare invoices as InvoiceData[]
        //  this.invoices = invoices;
        .subscribe((orders: Order[]) => { // Explicitly declare orders as Order[]
          this.orders = orders;
        }, (error: any) => {  // Explicitly declare error as any
          console.error('Error fetching invoices:', error);
        });
    } else {
      alert('Please login to see your orders.');
    }
  }
}
