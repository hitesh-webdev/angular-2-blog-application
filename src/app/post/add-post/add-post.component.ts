import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../shared/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, CanComponentDeactivate {

  changesSaved: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onAddPost() {
    this.changesSaved = true;
    alert('Your post has been published!');
    this.router.navigate(['/']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return confirm('Do you want to discard the changes?');
  }

}
