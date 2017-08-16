import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})
export class PostItemComponent implements OnInit {

  @Input() post: Post;

  dateString: string;
  timeString: string;

  constructor() { }

  ngOnInit() {
    const date = new Date(this.post.timestamp);
    this.dateString = date.toDateString();
    this.timeString = date.getHours() + ':' + date.getMinutes();
  }

}
