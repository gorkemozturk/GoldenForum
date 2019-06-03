import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/default/home/home.component';
import { PostComponent } from './components/default/post/post.component';
import { ForumComponent } from './components/default/forum/forum.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';

const routes: Routes = [
    // Default Routes
    { path: '', component: DefaultComponent, children: [ 
        { path: '', component: HomeComponent },
        { path: 'forum/:id', component: ForumComponent },
        { path: 'post/:id', component: PostComponent }
    ]},

    // Auth Routes
    { path: '', component: AuthComponent, children: [ 
        { path: 'login', component: LoginComponent },
    ]},
];

export const ApplicationRoutes = RouterModule.forRoot(routes);