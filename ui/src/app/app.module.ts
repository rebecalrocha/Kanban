import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from './auth.guard';

import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { BoardService } from './services/board.service';
import { CardService } from './services/card.service';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateBoardComponent,
    EditBoardComponent,
    KanbanComponent,
    CreateCardComponent,
    EditCardComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    AppRoutingModule,    
  ],
  providers: [
    AuthService, 
    AuthGuard,
    MessageService,
    UserService,
    BoardService,
    CardService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
