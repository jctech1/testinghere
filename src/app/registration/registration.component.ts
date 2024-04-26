import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { UserService } from '../user.service';

interface FirebaseError extends Error {
  code?: string;
}


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerEmail = '';
  registerPassword = '';
  loginEmail = '';
  loginPassword = '';
  user: any = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  }

  async registerWithEmail(): Promise<void> {
    try {
      await this.authService.registerWithEmail(this.registerEmail, this.registerPassword);
    } catch (error) {
      // Handle registration errors with email
    }
  }

  async loginWithEmail(): Promise<void> {
    try {
      await this.authService.loginWithEmail(this.loginEmail, this.loginPassword);
      // No need to set user in UserService here
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/wrong-password') {
        alert('Wrong password!');
      } else if (firebaseError.code === 'auth/user-not-found') {
        alert('This email does not have an account!');
      }
    }
  }
  

  async registerWithGoogle(): Promise<void> {
    try {
      await this.authService.registerWithGoogle();
    } catch (error) {
      // Handle registration errors with Google
    }
  }
  

  async onRegister(): Promise<void> {
    try {
      await this.authService.registerWithEmail(this.registerEmail, this.registerPassword);
      alert('Registration successful! Please check your email for a verification link.');
    } catch (error) {
      // Handle registration errors with email
    }
  }
  

  async onLogin(): Promise<void> {
    try {
      await this.authService.loginWithEmail(this.loginEmail, this.loginPassword);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/wrong-password') {
        alert('Wrong password!');
      } else if (firebaseError.code === 'auth/user-not-found') {
        alert('This email does not have an account!');
      } else if (firebaseError.message === 'Please verify your email before logging in.') {
        alert('Please verify your email before logging in.');
      }
    }
  }
  
  
}
