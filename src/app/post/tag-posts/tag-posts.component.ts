import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../shared/posts.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../post';

@Component({
  selector: 'app-tag-posts',
  templateUrl: './tag-posts.component.html',
  styleUrls: ['./tag-posts.component.css']
})
export class TagPostsComponent implements OnInit {

  tag: string;
  posts: Post[];
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.tag = params['tag'];
        this.posts = this.postService.postsList.filter(
          (post) => {
            return post['tags'].indexOf(this.tag) !== -1;
          }
        );
      }
    );

    // this.tag = this.route.snapshot.params['tag'];
    // console.log(this.posts);

  }

}
