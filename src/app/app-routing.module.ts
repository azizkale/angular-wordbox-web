import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { LevelA1Component } from './exercises/level-a1/level-a1.component';
import { LevelA2Component } from './exercises/level-a2/level-a2.component';
import { MenuLevelComponent } from './exercises/menu-level/menu-level.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'app-home', component:HomeComponent},
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'motherpage', component:MotherpageComponent },
  { path: 'level-a1', component:LevelA1Component },
  { path: 'level-a2', component:LevelA2Component },
  { path: 'menu-level', component:MenuLevelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
