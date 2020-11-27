import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { ExercisestypesComponent } from './exercises/exercisestypes/exercisestypes.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LearnedwordsComponent } from './learnedwords/learnedwords.component';
import { BigDictionaryComponent } from './big-dictionary/big-dictionary.component';
import { MylibraryComponent } from './mylibrary/mylibrary.component';
import { GraphQLModule } from './graphql.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MotherpageComponent,
    ExercisestypesComponent,
    FlashcardsComponent,
    LearnedwordsComponent,
    BigDictionaryComponent,
    MylibraryComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
