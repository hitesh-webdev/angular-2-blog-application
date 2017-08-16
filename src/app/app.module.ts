import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostItemComponent } from './post/post-list/post-item.component';
import { PostComponent } from './post/post.component';
import { SidebarComponent } from './post/sidebar/sidebar.component';
import { FooterComponent } from './footer.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { NotFoundComponent } from './not-found.component';
import { AuthGuard } from './shared/auth-guard.service';
import { LoginGuard } from './shared/login-guard.service';
import { AuthService } from './shared/auth.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';

/* Routing paths
============================================ */

const appRoutes: Routes = [
  {path: 'posts', component: PostComponent, children: [
    {path: '', component: PostListComponent, pathMatch: 'full'},
    {path: 'post-detail/:id', component: PostDetailComponent}
  ]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'add-post', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: AddPostComponent},
  {path: '', redirectTo: '/posts', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    PostItemComponent,
    PostComponent,
    SidebarComponent,
    FooterComponent,
    PostDetailComponent,
    LoginComponent,
    AddPostComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, AuthService, CanDeactivateGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
