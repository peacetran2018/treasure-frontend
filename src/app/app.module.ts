//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { TreasureHeaderComponent } from './shared/components/treasure-header/treasure-header.component';
import { TreasureMainComponent } from './components/treasure-main/treasure-main.component';
import { TreasureNoteListComponent } from './components/treasure-note-list/treasure-note-list.component';
import { TreasureNoteDetailComponent } from './components/treasure-note-detail/treasure-note-detail.component';
import { TreasureContentComponent } from './components/treasure-content/treasure-content.component';
import { TreasureLoginSignupComponent } from './components/treasure-login-signup/treasure-login-signup.component';



@NgModule({
  declarations: [
    AppComponent,
    TreasureHeaderComponent,
    TreasureMainComponent,
    TreasureNoteListComponent,
    TreasureNoteDetailComponent,
    TreasureContentComponent,
    TreasureLoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
