import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/user.service';
import {User} from '../../shared/models/user.models';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {StocksService} from '../../shared/services/stocks.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  errorText: string;

  constructor(private usersService: UsersService,
              private stocksService: StocksService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
    });
  }

  createUser(): void {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.getUserByEmail(user['email'])
      .subscribe(data => {
        if (data.length) {
          this.errorText = 'user already exists';
        } else {
          this.errorText = 'successfully';
          this.usersService.createNewUser(user)
            .subscribe((value) => {
              if (value) {
                this.authService.login(value['id']);
              }
            });
        }
      });

  }

}
