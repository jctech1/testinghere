import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any = null;
  isAdmin: boolean = false;

  constructor(private afAuth: AngularFireAuth, 
              private userService: UserService,
              private authService: AuthService) {} 

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
    });
  
    // Check if the logged-in user is an admin
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
  
  logout(): void {
    this.afAuth.signOut();
    this.userService.setCurrentUser(null);
  }
}
