import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from '../../shared/posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  subscription: Subscription;
  postId: number;
  post: Post;
  dateString: string;
  timeString: string;

  constructor(private authService: AuthService,
     private route: ActivatedRoute,
     private postsService: PostService,
     private router: Router) { }

  ngOnInit() {

    /* Fetching Parameter from the URL */
    this.postId = +this.route.snapshot.params['id']; // Type casting to integer

    /* Getting post from the PostService according to postId */
    for (let post of this.postsService.postsList) {
      if (post['postId'] === this.postId) {
        this.post = post;
        break;
      }
    }

    /* Navigating user if postId not found */
    if (this.post === undefined) {
      this.router.navigate(['/post-not-found']);
    }

    const date = new Date(this.post.timestamp);
    this.dateString = date.toDateString();
    this.timeString = date.getHours() + ':' + date.getMinutes();


    /* Visibility of comment box to the logged in user */
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
    this.subscription = this.authService.loginStatus.subscribe(
      (status) => {
        if (status) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
