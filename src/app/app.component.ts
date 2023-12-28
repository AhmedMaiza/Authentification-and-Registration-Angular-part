import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Produits';
  constructor (public authService: AuthService, private router:Router) {}

  ngOnInit() {
    this.authService.loadToken();
    if (!this.authService.getToken() || this.authService.isTokenExpired()){
            this.authService.logout();
    }
    else {
            this.authService.setLoggedUserFromLocalStorage(this.authService.loggedUser);
    }
  }

  

  onLogout(){
    this.authService.logout();
  }

}
