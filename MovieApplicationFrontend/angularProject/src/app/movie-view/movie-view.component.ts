import { Component } from '@angular/core';
import { MoviesService } from '../service/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoPlayerService } from '../service/video-player.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.css']
})
export class MovieViewComponent {
  movieDetail:any;
  player : any;

  playVideo()
  {
    this.player.playVideo();
  }

  constructor(private movieservice:MoviesService,private router:Router,private activatedRoute:ActivatedRoute,private videoPlayerService:VideoPlayerService){}
 // videoKey = 'r_pUE7OcN8w';


  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(data=>{
      let id=data.get('id')??0;
      console.log("id:-",id);
      this.movieservice.getMovieById(+id).subscribe((data)=>{
        this.movieDetail=data;
      // console.log(this.movieDetail.getPath("results")) 
        // console.log("movie data:"+this.movieDetail);
        console.log("movie data:", JSON.stringify(this.movieDetail));
      })
      // this.videoService.getMovieByIdForVideo(+id).subscribe(
      //   (key) => this.videoKey = key,
      //   (error) => console.error('Error fetching video key:', error)
      // );
    })
   
}
}