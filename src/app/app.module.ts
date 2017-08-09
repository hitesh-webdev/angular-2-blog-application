import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

/* Routing paths
============================================ */

const appRoutes: Routes = [
  {path: '', component: PostComponent, children: [
    {path: '', component: PostListComponent},
    {path: 'post-detail/:id', component: PostDetailComponent}
  ]},
  {path: 'login', component: LoginComponent},
  {path: 'add-post', component: AddPostComponent},
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
