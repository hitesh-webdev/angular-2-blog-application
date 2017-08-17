import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { PostService } from '../../shared/posts.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../shared/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../comment';
import { Post } from '../post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, CanComponentDeactivate {

  changesSaved: boolean = false;
  postForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'tags': new FormArray([])
    });
  }

  onAddPost() {
    this.changesSaved = true;
    console.log(this.postForm);

    const postId: number = this.postService.postsList.length + 1;
    const title: string = this.postForm.get('title').value;
    const author: string = this.authService.userEmail;
    const timestamp: number = new Date().getTime();
    const imagePath: string = this.postForm.get('imagePath').value;
    const content: string = this.postForm.get('content').value;

    /* Converting FormArray to String Array of Tags */
    const tags: string[] = [];
    for (const tag of (<FormArray>this.postForm.get('tags')).controls) {
      tags.push(tag.value.toString());
    }

    const comments: Comment[] = [];

    const post = new Post(postId, title, author, timestamp, imagePath, content, tags, comments);

    this.postService.postsList.push(post);

    alert('Your post has been published!');
    this.router.navigate(['/posts']);
  }

  onAddTag() {
    (<FormArray>this.postForm.get('tags')).push(
      new FormControl(null, Validators.required)
    );
  }

  onRemoveTag(index: number) {
    (<FormArray>this.postForm.get('tags')).removeAt(index);
  }

  onCancel() {
    this.changesSaved = true;
    this.postForm.reset();
    this.router.navigate(['/posts']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard the changes?');
    }
  }

}
