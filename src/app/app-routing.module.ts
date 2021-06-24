import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ApexLegendsComponent } from './pages/apex-legends/apex-legends.component';
import { ChatListComponent } from './pages/chat-list/chat-list.component';
import { CounterStrikeComponent } from './pages/counter-strike/counter-strike.component';
import { Error404Component } from './pages/error404/error404.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LeagueOfLegendsComponent } from './pages/league-of-legends/league-of-legends.component';
import { RocketLeagueComponent } from './pages/rocket-league/rocket-league.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SwipeComponent } from './pages/swipe/swipe.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'index', component: IndexComponent },
  { path: 'league-of-legends', component: LeagueOfLegendsComponent},
  { path: 'rocket-league', component: RocketLeagueComponent},
  { path: 'apex-legends', component: ApexLegendsComponent},
  { path: 'counter-strike', component: CounterStrikeComponent},
  { path: 'about-us', component : AboutUsComponent},
  { path: 'sign-in', component : SignInComponent},
  { path: 'swipe', component : SwipeComponent},
  { path: 'swipe/:id', component : SwipeComponent},
  { path: 'chat-list', component : ChatListComponent},
  { path: 'new-profile', component : CreateProfileComponent},
  { path: 'edit-profile/:id', component : EditProfileComponent},
  { path: 'error404', component : Error404Component},
  { path: 'error404', component : Error404Component},
  { path : '' , redirectTo : '/home' , pathMatch : 'full'},
  { path: '**', redirectTo: '/error404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
