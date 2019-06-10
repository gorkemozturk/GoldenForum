import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserWithPosts();
  }

  getUserWithPosts() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getResource(id).subscribe(response => this.user = response);
  }

}
