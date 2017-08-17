import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/posts.service';
import { Post } from '../post';

@Component({
  selector: 'app-tag-posts',
  templateUrl: './tag-posts.component.html',
  styleUrls: ['./tag-posts.component.css']
})
export class TagPostsComponent implements OnInit {

  tag: string;
  posts: Post[];

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {

    this.tag = this.route.snapshot.params['tag'];

    this.posts = this.postService.postsList.filter(
      (post) => {
        return post['tags'].indexOf(this.tag) !== -1;
      }
    );

    console.log(this.posts);

  }

}
