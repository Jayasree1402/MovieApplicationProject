import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesService } from './movies.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn : boolean = false;
  Token: string='';
constructor(private http:HttpClient, private movieservice:MoviesService){}

userUrl:string="http://localhost:9000/api/v2/register/image";
postUserDetails(body:any):Observable<any>{
  console.log("from service user",body);
  return this.http.post<any>(this.userUrl,body)
}

loginUrl:string="http://localhost:9000/api/v1/login";
loginUser(body:any):Observable<any>{
  this.isLoggedIn=true;
  console.log("calling service",body);
  return this.http.post<any>(this.loginUrl,body,{responseType:'text' as 'json'});
}
logout() {
  this.isLoggedIn = false;
  this.movieservice.Token='';
  location.reload();
  return this.isLoggedIn
}

getIsLoggedIn():boolean{

  return this.isLoggedIn;
}

}
