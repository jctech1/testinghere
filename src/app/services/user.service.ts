import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));

  constructor(private http: HttpClient) { }

  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser$.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  getCurrentUserValue(): any {
    return this.currentUser$.value;
  }

  getUserData(userId: string): Observable<any> {
    return this.http.get(`/api/users/${userId}`);
  }

  updateUserData(userId: string, data: any): Observable<any> {
    return this.http.put(`/api/users/${userId}`, data);
  }
}
