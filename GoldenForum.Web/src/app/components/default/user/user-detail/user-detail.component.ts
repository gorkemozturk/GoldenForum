import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserWithPosts();
  }

  getUserWithPosts() {
    const id = this.route.snapshot.paramMap.get('username');
    this.userService.getResource(id).subscribe(response => this.user = response);
  }

}
