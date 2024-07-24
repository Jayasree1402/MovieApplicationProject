import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// import { CarouselModule } from 'primeng/carousel';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
//import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
//import {YouTubePlayer} from '@angular/youtube-player';
import { YouTubePlayerModule } from '@angular/youtube-player';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';
//import { MatFormFieldControl } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { LogInComponent } from './log-in/log-in.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { SearchComponent } from './search/search.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { FooterComponent } from './footer/footer.component';
import { TvComponent } from './tv/tv.component';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { CarouselTestComponent } from './carousel-test/carousel-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MovieCardComponent,
    MovieViewComponent,
    LogInComponent,
    VideoPlayerComponent,
    SearchComponent,
    TopRatedComponent,
    PageNotFoundComponent,
    TvComponent,
    UpcomingMoviesComponent,
    FavoriteListComponent,
        FooterComponent,
        CarouselTestComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    // CarouselModule,
    MatToolbarModule,
    MatTooltipModule,
   // YouTubePlayer,
    YouTubePlayerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
