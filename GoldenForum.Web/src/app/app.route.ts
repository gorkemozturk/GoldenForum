import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/default/home/home.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostDetailComponent } from './components/default/post/post-detail/post-detail.component';
import { ForumDetailComponent } from './components/default/forum/forum-detail/forum-detail.component';
import { PostFormComponent } from './components/default/post/post-form/post-form.component';

const routes: Routes = [
    // Default Routes
    { path: '', component: DefaultComponent, children: [ 
        { path: '', component: HomeComponent },
        { path: 'post/:slug/:id', component: PostDetailComponent },
        { path: 'forum/:slug/:id', component: ForumDetailComponent },
        { path: 'forum/:slug/:id/post/new', component: PostFormComponent }
    ]},

    // Auth Routes
    { path: '', component: AuthComponent, children: [ 
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
];

export const ApplicationRoutes = RouterModule.forRoot(routes);