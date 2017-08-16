import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.posts = this.postsService.postsList;
  }

}
