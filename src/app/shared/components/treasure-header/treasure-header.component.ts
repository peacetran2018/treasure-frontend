import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-treasure-header',
  templateUrl: './treasure-header.component.html',
  styleUrls: ['./treasure-header.component.css']
})
export class TreasureHeaderComponent implements OnInit {
  loggedInUser: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.loggedInUser = user);
  }

  onLogOut() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

}
