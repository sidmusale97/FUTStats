import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayerDetailsComponent } from './player-details/player-details.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'players'
  },
  {
    path: 'players',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'players/:id',
    pathMatch: 'full',
    component: PlayerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
