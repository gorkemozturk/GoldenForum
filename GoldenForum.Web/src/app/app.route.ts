import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/default/home/home.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PostDetailComponent } from './components/default/post/post-detail/post-detail.component';
import { ForumDetailComponent } from './components/default/forum/forum-detail/forum-detail.component';
import { PostFormComponent } from './components/default/post/post-form/post-form.component';
import { UserDetailComponent } from './components/default/user/user-detail/user-detail.component';
import { ManagementComponent } from './layouts/management/management.component';
import { ManagementForumListComponent } from './components/management/forum/management-forum-list/management-forum-list.component';
import { ManagementReportListComponent } from './components/management/report/management-report-list/management-report-list.component';
import { DashboardComponent } from './components/management/dashboard/dashboard.component';
import { ManagementUserListComponent } from './components/management/user/management-user-list/management-user-list.component';

const routes: Routes = [
    // Default Routes
    { path: '', component: DefaultComponent, children: [ 
        { path: '', component: HomeComponent },
        { path: 'post/:slug/:id', component: PostDetailComponent },
        { path: 'forum/:slug/:id', component: ForumDetailComponent },
        { path: 'forum/:slug/:id/post/new', component: PostFormComponent },
        { path: 'user/:username', component: UserDetailComponent }
    ]},

    // Management Routes
    { path: 'management', component: ManagementComponent, children: [ 
        { path: 'dashboard', component: DashboardComponent },
        { path: 'forums', component: ManagementForumListComponent },
        { path: 'reports', component: ManagementReportListComponent },
        { path: 'users', component: ManagementUserListComponent },
    ]},

    // Auth Routes
    { path: '', component: AuthComponent, children: [ 
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
    ]},
];

export const ApplicationRoutes = RouterModule.forRoot(routes);