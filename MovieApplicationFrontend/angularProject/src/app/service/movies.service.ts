import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, OperatorFunction } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
//Token:string='';

  movie_url="http://localhost:8080/api/v1/getMovie";

  // private moviesData:any[]=[];
  constructor(private http:HttpClient) { }

  getAllMovies():Observable<any[]>{     
    return this.http.get<any[]>(this.movie_url);   
  }

  getMovieById(id:number):Observable<any>{
    // console.log("service"+id);
    return this.http.get<any>(`${this.movie_url}/${id}`);
  }
  getTopRated():Observable<any[]>{
    return this.http.get<any>(`http://localhost:8080/api/v1/getTopRatedMovie`);
  }

  getFav_List_url:string="http://localhost:9000/api/v2/user/movies";

  getFavList():Observable<any>{
    let tokenStr='Bearer '+this.Token;

    const headers=new HttpHeaders().set("Authorization",tokenStr);
    console.log("token from favlistget",headers);
    return this.http.get<any>(this.getFav_List_url,{headers});

  }

  del_fav_url:string="http://localhost:9000/api/v2/user/movie";
  deleteFavMovie(id:any):Observable<any>{
    let tokenStr='Bearer '+this.Token;

    const headers=new HttpHeaders().set("Authorization",tokenStr);
    console.log("token from favlistget",headers);
    return this.http.delete<any>(`${this.del_fav_url}/${id}`,{headers});
  }

  Token:string='';
  fav_url="http://localhost:9000/api/v2/user/movie";

  addFavourite(body:any):Observable<any>{
    let tokenStr='Bearer '+this.Token;
    console.log("tokenbearer:",tokenStr);
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    console.log("headers",headers);
    // console.log(request);
    return this.http.post<any>(this.fav_url,body,{headers,responseType:'text' as 'json'});
  }


  getUpcoming():Observable<any[]>{
    return this.http.get<any>(`http://localhost:8080/api/v1/getUpcoming`);
  }
  getTv():Observable<any[]>{
    return this.http.get<any>(`http://localhost:8080/api/v1/getTv`);
  }
}
