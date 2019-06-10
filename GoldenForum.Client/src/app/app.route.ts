import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/default/home/home.component';
import { PostComponent } from './components/default/post/post.component';
import { ForumComponent } from './components/default/forum/forum.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PostFormComponent } from './components/default/post-form/post-form.component';
import { UserProfileComponent } from './components/default/user-profile/user-profile.component';

const routes: Routes = [
    // Default Routes
    { path: '', component: DefaultComponent, children: [ 
        { path: '', component: HomeComponent },
        { path: 'forum/:id', component: ForumComponent },
        { path: 'forum/:forumId/post/new', component: PostFormComponent },
        { path: 'forum/:forumId/post/:postId/edit', component: PostFormComponent },
        { path: 'post/:id', component: PostComponent },
        { path: 'user/:id', component: UserProfileComponent },
    ]},

    // Auth Routes
    { path: '', component: AuthComponent, children: [ 
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
];

export const ApplicationRoutes = RouterModule.forRoot(routes);