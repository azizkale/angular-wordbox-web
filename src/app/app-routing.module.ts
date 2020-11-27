import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { ExercisestypesComponent } from './exercises/exercisestypes/exercisestypes.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { LearnedwordsComponent } from './learnedwords/learnedwords.component';
import { BigDictionaryComponent } from './big-dictionary/big-dictionary.component';
import { MylibraryComponent } from './mylibrary/mylibrary.component';
import { GoogleauthComponent } from './googleauth/googleauth.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app-home', component: HomeComponent },
  { path: 'mylibrary', component: MylibraryComponent },
  // { path: 'dictionary', component: DictionaryComponent },
  { path: 'motherpage', component: MotherpageComponent },
  { path: 'exercisestypes/:group', component: ExercisestypesComponent },
  { path: 'flashcards', component: FlashcardsComponent },
  { path: 'learnedwords', component: LearnedwordsComponent },
  { path: 'bigDictionary', component: BigDictionaryComponent },
  { path: 'login', component: GoogleauthComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
