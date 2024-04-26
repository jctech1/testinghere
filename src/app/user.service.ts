import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    // Update currentUser$ when Firebase authentication state changes
    this.afAuth.authState.subscribe(user => {
      this.setCurrentUser(user);
    });
  }

  setCurrentUser(user: any): void {
    this.currentUser$.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$.asObservable();
  }

  getUserData(userId: string): Observable<any> {
    return this.http.get(`/api/users/${userId}`);
  }

  updateUserData(userId: string, data: any): Observable<any> {
    return this.http.put(`/api/users/${userId}`, data);
  }
}
