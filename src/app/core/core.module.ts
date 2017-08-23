import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { NotFoundComponent } from './not-found.component';

/* Services
=========================================== */
import { AuthGuard } from '../shared/auth-guard.service';
import { LoginGuard } from '../shared/login-guard.service';
import { AuthService } from '../shared/auth.service';
import { PostService } from '../shared/posts.service';
import { SearchService } from '../shared/search.service';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [PostService, SearchService, AuthGuard, AuthService, CanDeactivateGuard, LoginGuard]
})
export class CoreModule {
}
