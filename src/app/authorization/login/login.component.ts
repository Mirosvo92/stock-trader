import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user.models';
import {UsersService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errorText: string;

  constructor(private usersService: UsersService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  comeIn(): void {
    this.usersService.getUserByEmail(this.form.value.email)
      .subscribe((user) => {
        if (user[0]) {
          if (user[0].password === this.form.value.password) {
            this.errorText = '';
            this.authService.login(user[0]['id']);
          } else {
            this.errorText = 'Password invalid';
          }
        } else {
          this.errorText = 'User do not exist';
        }
      });
  }

}
