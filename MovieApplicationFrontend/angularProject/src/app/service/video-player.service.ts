import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  private apiUrl = 'http://localhost:8080/api/v1/video/key';

  constructor(private http: HttpClient) { }

  getVideoKeys(movieId: number): Observable<string> {
   return this.http.get<string>(`${this.apiUrl}/${movieId}`);
  
  }
}
