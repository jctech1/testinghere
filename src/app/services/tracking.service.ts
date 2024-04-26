import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tracking } from '../models/tracking.model';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor(private http: HttpClient) { }

  getTrackingData(trackingId: string) {
    return this.http.get(`/api/trackings/${trackingId}`);
  }

  updateTrackingData(trackingId: string, data: Tracking) {
    return this.http.put(`/api/trackings/${trackingId}`, data);
  }
}
