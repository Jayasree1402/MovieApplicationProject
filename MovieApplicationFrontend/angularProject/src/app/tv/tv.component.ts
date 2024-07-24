import { Component, NgModule } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
// @NgModule({
//   declarations: [
//     TvComponent ,
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

export class TvComponent {
  movies:any[]=[];
 // displayedMovies: any[] = []; // Array to store the top 10 movies for display

 isLoggedIn : boolean = false;
  constructor(private moviesService:MoviesService,private router:Router,private snackBar:MatSnackBar,private authservie:AuthService){
  }

  favoriteItems: string[] = [];

  addFavorite(movie : any) {
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
    this.moviesService.getTv().subscribe({next:(data:any)=>{
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