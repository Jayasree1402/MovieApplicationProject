import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

   // private apiUrl = 'http://localhost:8080/api/v1/search';

   constructor(private http:HttpClient) { }
   getMovies(title: string) {
      return fetch(
        "https://api.themoviedb.org/3/" + 'search/movie?query=' + title + '&api_key=086460204e528151b857887f6bb1a409&append_to_response=videos'
     ).then(response => response.json());
    // // return this.http.get(this.baseURL+'search/movie?query='+title+'&api_key='+this.apiKey)
    // .pipe(
    // map((response: any) => response.json)
    // );
   // return (this.http.get<any[]>(`${this.apiUrl}/${title}`));


      }
  ngOnInit(){}

    }
