import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DictionaryComponent } from './dictionary/dictionary.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'app-home', component:HomeComponent},
  { path: 'dictionary', component: DictionaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
