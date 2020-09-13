import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DictionaryComponent } from './dictionary/dictionary.component';

import { HttpClientModule } from '@angular/common/http';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { ExercisestypesComponent } from './exercises/exercisestypes/exercisestypes.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnedwordsComponent } from './learnedwords/learnedwords.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    FormsModule
=======
    DictionaryComponent,
    NavbarComponent,
    MotherpageComponent,
    ExercisestypesComponent,
    FlashcardsComponent,
    LearnedwordsComponent
>>>>>>> 72989d9e7c83e7a784f1e049a48c2b7942a6d72d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    FormsModule,
    CommonModule,
    DictionaryComponent
=======
    FormsModule, 
    CommonModule,
    BrowserAnimationsModule
>>>>>>> 72989d9e7c83e7a784f1e049a48c2b7942a6d72d
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
