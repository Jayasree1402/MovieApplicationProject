import { Component } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {

  fav_movies:any[]=[];
movieExists:boolean=false;
isLoggedIn : boolean = false;
  constructor(private moviesService:MoviesService){}

  ngOnInit():void{
      this.favorateMovie();
    }


    removeMovie(movie:any){
      console.log(movie.id);
      this.moviesService.deleteFavMovie(movie.id).subscribe(data=>{
        console.log("fav data:",data);
        this.fav_movies=data;
        this.favorateMovie();
      })
    }

    favorateMovie(){
    this.moviesService.getFavList().subscribe({next:data=>{
      console.log(data);
      this.movieExists=true;
      this.fav_movies=data;
      console.log("fav movies:",this.fav_movies);
    
    },
    error:error=>{
      // alert("Error while fetching data");
      // console.log("error msg:",error);
      this.movieExists=false;

    }});
  }
}
