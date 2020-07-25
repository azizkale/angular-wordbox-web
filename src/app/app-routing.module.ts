import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { ExercisestypesComponent } from './exercises/exercisestypes/exercisestypes.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { LearnedwordsComponent } from './learnedwords/learnedwords.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'app-home', component:HomeComponent},
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'motherpage', component:MotherpageComponent },
  { path: 'exercisestypes', component:ExercisestypesComponent },
  { path: 'flashcards', component:FlashcardsComponent },
  { path: 'learnedwords', component:LearnedwordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
