import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Holds current user
  // null = nobody logged in
  currentUser: User | null = null;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Subscribe to user changes
    // When user logs in → currentUser updates
    // When user logs out → currentUser becomes null
    // Nav bar updates automatically
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}