import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { QuillModule } from 'ngx-quill'

import { AppComponent } from './app.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HeaderComponent } from './components/default/header/header.component';
import { FooterComponent } from './components/default/footer/footer.component';
import { HomeComponent } from './components/default/home/home.component';
import { ApplicationRoutes } from './app.route';
import { PostShortlistComponent } from './includes/post/post-shortlist/post-shortlist.component';
import { ForumListComponent } from './includes/forum/forum-list/forum-list.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { PostOverviewComponent } from './includes/post/post-overview/post-overview.component';
import { ForumComponent } from './components/default/forum/forum.component';
import { ForumOverviewComponent } from './includes/forum/forum-overview/forum-overview.component';
import { ReplyFormComponent } from './includes/reply/reply-form/reply-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ReplyEntryComponent } from './includes/reply/reply-entry/reply-entry.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RatingComponent } from './includes/user/rating/rating.component';
import { PostListComponent } from './includes/post/post-list/post-list.component';
import { PostEntryComponent } from './includes/post/post-entry/post-entry.component';
import { UserProfileComponent } from './components/default/user-profile/user-profile.component';
import { PostComponent } from './components/default/post/post.component';
import { PostFormComponent } from './components/default/post-form/post-form.component';
import { ReplyShortlistComponent } from './includes/reply/reply-shortlist/reply-shortlist.component';
import { ReplyOverviewComponent } from './includes/reply/reply-overview/reply-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PostShortlistComponent,
    ForumListComponent,
    SummaryPipe,
    PostOverviewComponent,
    ForumComponent,
    ForumOverviewComponent,
    ReplyFormComponent,
    LoginComponent,
    ReplyEntryComponent,
    RegisterComponent,
    RatingComponent,
    PostListComponent,
    PostEntryComponent,
    UserProfileComponent,
    PostComponent,
    PostFormComponent,
    ReplyShortlistComponent,
    ReplyOverviewComponent
  ],
  imports: [
    BrowserModule,
    ApplicationRoutes,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
