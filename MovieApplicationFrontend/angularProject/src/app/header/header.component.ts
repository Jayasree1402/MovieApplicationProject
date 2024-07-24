import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // isLoggedIn : boolean = false;
   constructor(private auth: AuthService, private router: Router,private movieservice:MoviesService) {}
  // logout() {
  //   this.isLoggedIn =   this.auth.logout(); 
  // this.router.navigate(['/']);
  //   return this.isLoggedIn;
    
  // }

  isLoggedIn(): boolean {
    return this.auth.getIsLoggedIn();
  }

  login() {
    this.auth.isLoggedIn;
  }

  logout() {
  this.auth.logout();
  console.log(this.movieservice.Token)
  
  this.router.navigate(['/']); 
  }



  
}
