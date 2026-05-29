import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authService: AuthService) {}
  // public — so HTML template can access it
}