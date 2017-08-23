import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PostModule } from './post/post.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    PostModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
