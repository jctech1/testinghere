export interface Tracking {
  userId: string;
  trackingNumber: string;
  productName: string;
  productLocation: string;
  customerName: string;
  customerStatus: string; // "regular" or "star"
  status: string; // e.g. "In Transit", "Delivered"
  estimatedDeliveryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
