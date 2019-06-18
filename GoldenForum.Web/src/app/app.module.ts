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
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ApplicationRoutes } from './app.route';
import { SummaryPipe } from './pipes/summary.pipe';
import { PostShortlistComponent } from './includes/post/post-shortlist/post-shortlist.component';
import { ReplyShortlistComponent } from './includes/reply/reply-shortlist/reply-shortlist.component';
import { PostOverviewComponent } from './includes/post/post-overview/post-overview.component';
import { PostDetailComponent } from './components/default/post/post-detail/post-detail.component';
import { PostReplyEntryComponent } from './includes/global/post-reply-entry/post-reply-entry.component';
import { PostFormComponent } from './components/default/post/post-form/post-form.component';
import { ReplyFormComponent } from './includes/reply/reply-form/reply-form.component';
import { ForumDetailComponent } from './components/default/forum/forum-detail/forum-detail.component';
import { ForumOverviewComponent } from './includes/forum/forum-overview/forum-overview.component';
import { PostOwnerComponent } from './includes/post/post-owner/post-owner.component';
import { PostListComponent } from './includes/post/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SummaryPipe,
    PostShortlistComponent,
    ReplyShortlistComponent,
    PostOverviewComponent,
    PostDetailComponent,
    PostReplyEntryComponent,
    PostFormComponent,
    ReplyFormComponent,
    ForumDetailComponent,
    ForumOverviewComponent,
    PostOwnerComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApplicationRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
