// carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { InvoiceService } from '../services/invoice.service';
import { Product, ProductData } from '../models/product.model';
import { Invoice, InvoiceData } from '../models/invoice.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  orderNumber: string = '';
  orderDate: string = '';
  cartItems: Product[] = [];
  orderMade = false;

  constructor(
    public cartService: CartService, 
    private invoiceService: InvoiceService,
    private router: Router,
    private userService: UserService  // Inject UserService here

  ) {
    this.cartService.getCartItems().subscribe((items: Product[]) => {
      this.cartItems = items;
      console.log('Received cart items:', items);
    });
  }

  ngOnInit(): void {
    this.orderNumber = Date.now().toString();
    const dateObj = new Date();
    this.orderDate = `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
    this.cartService.getCartItems().subscribe((items: Product[]) => {
      this.cartItems = items;
      console.log('Received cart items:', items);
    });
  }

  get pesoPrice(): number {
    return this.invoiceService.calculateInvoiceWeightPrice(this.cartService.calculateTotalWeight());
  }

  get guiaAduanaje(): number {
    return 15;
  }

  get totalCost(): number {
    return this.cartService.calculateSubtotal();
  }

  get totalPrice(): number {
    return this.invoiceService.calculateInvoiceTotalPrice(this.totalCost, this.pesoPrice, this.guiaAduanaje);
  }


  makeOrder(): void {
    const user = this.userService.getCurrentUserValue();
    if (user) {
      const user = this.userService.getCurrentUserValue();
      console.log("User in CarritoComponent:", user);  // <-- Add this line
      //const userId = user.uid;  // Assuming 'uid' is the user's unique identifier
      let products: ProductData[] = this.cartItems.map((product: Product) => {
        return {
          productId: product.productId,
          url: product.url,
          productName: product.productName,
          price: product.price,
          weight: product.weight,
          quantity: product.quantity,
          weightUnit: product.weightUnit,
          userId: user.uid // add the user id to each product
        };
      });
      
      let invoiceData: InvoiceData = {
        products: products,
        subtotal: this.totalCost,
        precioPorPeso: this.pesoPrice,
        precioTotal: this.totalPrice,
        reference: this.orderNumber,
        userId: user.uid // add the user id to the invoice
      };
  
      const invoice = new Invoice(invoiceData);
  
      this.invoiceService.saveInvoice(invoice).subscribe(() => {
        this.orderMade = true;
        this.cartService.clearCart();
        this.router.navigate(['/home']);
      }, error => {
        console.log('Error:', error);
      });
    } else {
      alert('Please login or create an account to continue.');
    }
  }
}