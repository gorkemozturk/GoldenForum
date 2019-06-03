import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HeaderComponent } from './components/default/header/header.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { HomeComponent } from './components/default/home/home.component';
import { ApplicationRoutes } from './app.route';
import { LatestPostComponent } from './widgets/latest-post/latest-post.component';
import { ForumListComponent } from './widgets/forum-list/forum-list.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { PostComponent } from './components/default/post/post.component';
import { PostOverviewComponent } from './widgets/post-overview/post-overview.component';
import { ForumComponent } from './components/default/forum/forum.component';
import { ForumOverviewComponent } from './widgets/forum-overview/forum-overview.component';
import { ReplyFormComponent } from './widgets/reply-form/reply-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReplyEntryComponent } from './widgets/reply-entry/reply-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LatestPostComponent,
    ForumListComponent,
    SummaryPipe,
    PostComponent,
    PostOverviewComponent,
    ForumComponent,
    ForumOverviewComponent,
    ReplyFormComponent,
    LoginComponent,
    ReplyEntryComponent
  ],
  imports: [
    BrowserModule,
    ApplicationRoutes,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
