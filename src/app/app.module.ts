import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MotherpageComponent } from './exercises/motherpage/motherpage.component';
import { MenuLevelComponent } from './exercises/menu-level/menu-level.component';
import { ExercisestypesComponent } from './exercises/exercisestypes/exercisestypes.component';
import { FlashcardsComponent } from './exercises/flashcards/flashcards.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DictionaryComponent,
    NavbarComponent,
    MotherpageComponent,
    MenuLevelComponent,
    ExercisestypesComponent,
    FlashcardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
