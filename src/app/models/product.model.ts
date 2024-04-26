// product.model.ts
// product.model.ts
export type ProductData = {
  productId: string;
  url: string;
  productName: string;
  price: number;
  weight: number;
  quantity: number;
  weightUnit: string;
  userId: string; // add the user id to each product
}


export class Product {
  productId: string;
  url: string;
  productName: string;
  price: number;
  weight: number;
  quantity: number;
  weightUnit: string;  // Add weightUnit here

  constructor(data: ProductData) {    
    this.productId = data.productId;
    this.url = data.url;
    this.productName = data.productName;
    this.price = data.price;
    this.weight = data.weight;
    this.quantity = data.quantity;
    this.weightUnit = data.weightUnit;  // Initialize weightUnit here
  }
}
