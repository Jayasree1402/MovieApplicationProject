import { Component } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  movies:any[]=[];
  constructor(private moviesService:MoviesService,private router:Router,private snackBar:MatSnackBar,private authservie:AuthService){
 
 
  }

  favoriteItems: string[] = [];
  isLoggedIn : boolean = false;

  addFavorite(movie:any) {
  
    // console.log("from method",movie);
    // this.moviesService.addFavourite(movie).subscribe({
      
    //   next:
    //   data=>{
    //     console.log("data",data);
    //   this.snackBar.open('Movie is Added to favorite list', '' , {
    //     duration:3000,
    //     panelClass: ['mat-primary']});
    // },
    // error: (error) =>{
    //   console.log("error:",error);  
    //   if( this.isLoggedIn==true){
    //   this.snackBar.open('Already Added to favorite list',"",{
    //     duration: 3000,
    //     panelClass: ['mat-toolbar', 'mat-primary'],})} 
    //   }
    //   })





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
    
  // }

  ngOnInit():void{
    console.log("calling service");
    this.moviesService.getAllMovies().subscribe({next:(data:any)=>{
      this.movies=data.results;
      console.log("movie details",this.movies);
    },
  error:(error: any)=>{
    alert("fetching movie data");
    console.error("error msg",error);
  }});

  this.isLoggedIn=this.authservie.getIsLoggedIn();
  }
  

}
