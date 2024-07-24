import { Component, NgModule } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrls: ['./upcoming-movies.component.css']

})
// @NgModule({
//   declarations: [
//     UpcomingMoviesComponent ,
//     // ... other components
//   ],
//   imports: [
//     MatCardModule,
//     MatIconModule,
//     // ... other modules
//   ],
//   providers: [],
//   bootstrap: [/* ... */],
// })

export class UpcomingMoviesComponent {

  movies:any[]=[];
  // displayedMovies: any[] = []; // Array to store the top 10 movies for display
 
 
   constructor(private moviesService:MoviesService,private router:Router,private snackBar:MatSnackBar,private authservie:AuthService){
   }
 
   favoriteItems: string[] = [];
   isLoggedIn : boolean = false;
   addFavorite(movie:any) {
    if (this.isLoggedIn) {
      this.moviesService.addFavourite(movie).subscribe({
        next: (data) => {
          console.log("data", data);
          this.snackBar.open('Movie is Added to favorite list', '', {
            duration: 3000,
            panelClass: ['mat-primary']
          });
        },
        error: (error) => {
          console.log("error:", error);
          this.snackBar.open('Already Added to favorite list', "", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary'],
          });
        }
      });
    } else {
      // Redirect to the login page if the user is not logged in
      // You can also show a message here if needed
      // You may need to import the Router service and inject it in the constructor
      // Example: constructor(private router: Router) {}
      // And then use this.router.navigate(['/login']) to navigate to the login page
      this.router.navigate(['/login'])
    }
  
   }
 
 
 
   ngOnInit():void{
     console.log("calling service");
     this.moviesService.getUpcoming().subscribe({next:(data:any)=>{
       this.movies=data.results;
       console.log("movie details", this.movies);
 
       // Display only the top 10 movies
      // this.displayedMovies = this.movies.slice(0, 10);
     },
   error:(error: any)=>{
     alert("Errror while fetching movie data");
     console.error("error msg",error);
   }})
   this.isLoggedIn=this.authservie.getIsLoggedIn();
   }
 
   
 
 
   

}
