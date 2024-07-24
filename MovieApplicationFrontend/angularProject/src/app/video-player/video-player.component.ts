import { Component } from '@angular/core';
import { VideoPlayerService } from '../service/video-player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MoviesService } from '../service/movies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {

  videoDetails : any;

 firstVideoKey: string='';
  

  constructor( private videoService: VideoPlayerService,private activatedRoute:ActivatedRoute,private auth:AuthService
    ,private moviesService:MoviesService,private router:Router,private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data=>{
      let id=data.get('id')??0;
      console.log("id:-",id);

      this.videoService.getVideoKeys(+id).subscribe(data => {
        this.videoDetails = data;
        console.log("video data:", JSON.stringify(this.videoDetails));

        // Assuming videoDetails is an array of strings
        if (Array.isArray(this.videoDetails) && this.videoDetails.length > 0) {
          this.firstVideoKey = this.videoDetails[0];
          console.log("First video key:", this.firstVideoKey);   
        }
      });
    });
  }

  isPlayerVisible = false;
  currentVideoId: string | undefined;
  
  playVideo() {

    
   
    
    // Set the YouTube video ID you want to play
   
  
    this.currentVideoId = this.firstVideoKey;
    // Show the player
    this.isPlayerVisible = true;
  }

  onPlayerReady(event: any) {
    // Handle player ready event
    console.log('Player is ready:', event);
    // You can add additional logic here if needed
  }

  isLoggedIn : boolean = false;

  isLoggedInForVideo(): boolean {
   
  this.isLoggedIn = this.auth.isLoggedIn; 
  
    return this.isLoggedIn;
  }
}

