// invoice.model.ts
export interface InvoiceData {
  products: ProductData[];
  subtotal: number;
  precioPorPeso: number;
  precioTotal: number;
  reference: string;
  userId: string; // new field for user id
}

export interface ProductData {
  productId: string;
  url: string;
  productName: string;
  price: number;
  weight: number;
  quantity: number;  // Add quantity here
  weightUnit: string;
  userId: string; // new field for user id
}



export class Invoice {
  products: ProductData[];
  subtotal: number;
  precioPorPeso: number;
  precioTotal: number;
  reference: string;
  userId: string; // Add this line

  constructor(data: InvoiceData) {    
    this.products = data.products;
    this.subtotal = data.subtotal;
    this.precioPorPeso = data.precioPorPeso;
    this.precioTotal = data.precioTotal;
    this.reference = data.reference;
    this.userId = data.userId; // Add this line
  }
}

