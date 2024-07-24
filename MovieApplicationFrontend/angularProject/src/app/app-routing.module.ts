import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { LogInComponent } from './log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

const routes: Routes = [
  {path:'',component:MovieCardComponent},
  {path:'movie-view/:id',component:MovieViewComponent},
  {path:'login',component:LogInComponent},
  {
    path:'favorite-list',component:FavoriteListComponent
  },
  {
    path : "**",
    component:PageNotFoundComponent
   }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
