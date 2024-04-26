import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, signOut } from 'firebase/auth';
import { UserService } from './user.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private userService: UserService) {}

  async registerWithEmail(email: string, password: string): Promise<void> {
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(result.user); // Send verification email
    this.userService.setCurrentUser(result.user); // Update current user after registration

    // Sign out the user after sending the verification email
    await signOut(auth);
  }

  async loginWithEmail(email: string, password: string): Promise<any> {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        if (!user.emailVerified) {
          throw new Error('Please verify your email before logging in.');
        }
  
        const { displayName, ...otherUserProps } = user;
  
        //const formattedUser = {
          //displayName: email.substring(0, email.lastIndexOf("@")),
        //  ...otherUserProps
       // };
  
        //this.userService.setCurrentUser(formattedUser);
        const formattedUser = {
          displayName: email.substring(0, email.lastIndexOf("@")),
          ...otherUserProps // Include other user data
        };
        
        console.log("Formatted User in AuthService:", formattedUser);  // <-- Add this line
        
        this.userService.setCurrentUser(formattedUser); 
        return formattedUser;
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  
  
  // ... rest of the methods


  async registerWithGoogle(): Promise<void> {
    console.log('Registering with Google...');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (user) {
        // Extract other properties from user, but exclude the original displayName
        const { displayName, ...otherUserProps } = user;
  
        let formattedUserDisplayName = "";
        if (user.email) {
          formattedUserDisplayName = user.email.substring(0, user.email.lastIndexOf("@"));
        } else {
          // Handle cases where email is null
          formattedUserDisplayName = displayName ? displayName : "User";
        }
  
        const formattedUser = {
          displayName: formattedUserDisplayName,
          ...otherUserProps // Include other user data
        };
  
        this.userService.setCurrentUser(formattedUser); // Update current user after login
        localStorage.setItem('currentUser', JSON.stringify(formattedUser)); // Store the user in local storage directly here
      }
    } catch (error) {
      console.error('Error registering with Google:', error);
    }
  }
  

  

  async registerWithApple(): Promise<void> {
    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // Handle registration errors with Apple
    }
  }
  isAdmin(): Observable<boolean> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return from(user.getIdTokenResult()).pipe(
        map(token => token.claims['role'] === 'admin'),
        catchError(() => of(false))
      );
    }
    return of(false);
  }
  
  

}
