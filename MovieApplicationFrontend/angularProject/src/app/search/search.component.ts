import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../service/movies.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  title: string='';
  movies: any = [];
  errorMsg: string='';
 
  constructor(private route: Router, private movieService: MoviesService,private searchService:SearchService,private activatedRoute:ActivatedRoute) { }
   getMovie(title: string) {
     this.searchService.getMovies(title)
     .then((response: any) => {
       // Filter out movies without poster and rating
       this.movies = response.results.filter((movie: { poster_path: any; vote_average: any; }) => movie.poster_path && movie.vote_average );
     })
     .catch((error: { message: any; }) => {
       console.log(error.message);
       this.errorMsg = 'Error fetching movie data';
     });

  }
}
