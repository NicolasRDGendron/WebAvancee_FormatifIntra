import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USERS, User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users = USERS;
  selectedUser?: User;

  constructor(public user:UserService, public route: Router) { }

  ngOnInit() {

  }

  login()  {
    console.log(this.selectedUser);

    if(this.selectedUser)
      this.user.connect(this.selectedUser);
  }
}
