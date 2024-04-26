export interface ProductData {
  product: string; // assuming this is the product id
  quantity: number;
}

export interface Order {
  _id: string; // this should match the ObjectId from MongoDB
  user: string; // this is the userId
  products: ProductData[];
  totalCost: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  ordernumber: string;
}
